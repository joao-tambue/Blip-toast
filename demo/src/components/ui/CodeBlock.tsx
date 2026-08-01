import { useEffect, useState } from 'react';
import type { HighlighterCore } from 'shiki/core';
import { CopyButton } from './CopyButton';
import { cn } from '../../lib/cn';

/* Shiki is lazy-loaded so the highlighter never blocks first paint. The slim
   `shiki/core` + per-language imports keep the lazy chunk to ~600KB instead
   of pulling every bundled language (~10MB). */
const LANGS = {
  tsx: () => import('@shikijs/langs/tsx'),
  typescript: () => import('@shikijs/langs/typescript'),
  javascript: () => import('@shikijs/langs/javascript'),
  jsx: () => import('@shikijs/langs/jsx'),
  json: () => import('@shikijs/langs/json'),
  css: () => import('@shikijs/langs/css'),
  html: () => import('@shikijs/langs/html'),
  bash: () => import('@shikijs/langs/bash'),
} as const;

const LANG_ALIASES: Record<string, string> = {
  shellscript: 'bash',
  js: 'javascript',
  ts: 'typescript',
  node: 'javascript',
};

interface ShikiBundle {
  highlighter: HighlighterCore;
  codeToHtml: (code: string, lang: string) => string;
}

let highlighterPromise: Promise<ShikiBundle> | null = null;

function createHighlighterBundle(): Promise<ShikiBundle> {
  return (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, theme] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('@shikijs/themes/tokyo-night'),
    ]);
    const langDefs = await Promise.all(
      Object.values(LANGS).map((load) => load().then((m) => m.default))
    );
    const highlighter = await createHighlighterCore({
      themes: [theme.default],
      langs: langDefs,
      engine: createJavaScriptRegexEngine(),
    });
    return {
      highlighter,
      codeToHtml: (code, lang) =>
        highlighter.codeToHtml(code, {
          lang: LANG_ALIASES[lang] ?? lang,
          theme: 'tokyo-night',
        }),
    };
  })();
}

function loadHighlighter(): Promise<ShikiBundle> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterBundle();
  }
  return highlighterPromise;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', filename, className }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    loadHighlighter().then(async (bundle) => {
      if (cancelled) return;
      try {
        const out = bundle.codeToHtml(code, language);
        if (cancelled) return;
        setHtml(out);
      } catch {
        setHtml(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-[#12121b] shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f57]/80" />
            <span className="size-3 rounded-full bg-[#febc2e]/80" />
            <span className="size-3 rounded-full bg-[#28c840]/80" />
          </span>
          {filename && <span className="truncate font-mono text-xs text-muted">{filename}</span>}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="hidden font-mono text-[10px] font-medium uppercase tracking-widest text-muted/60 sm:block">
            {language}
          </span>
          <CopyButton text={code} />
        </div>
      </div>

      {html ? (
        <div
          className="overflow-x-auto"
          // The HTML comes from shiki (trusted, generated locally at runtime).
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="p-5 font-mono text-[13px] leading-relaxed text-slate-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
