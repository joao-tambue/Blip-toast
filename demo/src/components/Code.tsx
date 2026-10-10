import { useEffect, useRef, useState } from 'react';
import type { HighlighterCore } from 'shiki/core';
import { Check, Copy, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { cn } from '../lib/cn';
import { installCommands, type PackageManager } from '../lib/site-config';

/* Shiki is lazy-loaded so the highlighter never blocks first paint. The slim
   `shiki/core` + per-language imports keep the lazy chunk small. */
let highlighterPromise: Promise<HighlighterCore> | null = null;

function loadHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, theme, tsx, bash] =
        await Promise.all([
          import('shiki/core'),
          import('shiki/engine/javascript'),
          import('@shikijs/themes/vitesse-dark'),
          import('@shikijs/langs/tsx'),
          import('@shikijs/langs/bash'),
        ]);
      return createHighlighterCore({
        themes: [theme.default],
        langs: [tsx.default, bash.default],
        engine: createJavaScriptRegexEngine(),
      });
    })();
  }
  return highlighterPromise;
}

function useHighlighted(code: string, lang: string) {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadHighlighter().then((hl) => {
      if (cancelled) return;
      try {
        setHtml(hl.codeToHtml(code, { lang, theme: 'vitesse-dark' }));
      } catch {
        setHtml(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);
  return html;
}

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const { t } = useTranslation();
  const { copied, copy } = useCopyToClipboard();
  return (
    <button
      type="button"
      onClick={() => void copy(text)}
      aria-label={copied ? t('copy.copied') : t('copy.aria')}
      title={copied ? t('copy.copied') : t('copy.copy')}
      className={cn(
        'flex size-8 items-center justify-center rounded-md text-code-ink/60 transition-colors hover:bg-white/[0.07] hover:text-code-ink',
        className
      )}
    >
      {copied ? <Check size={15} className="text-[#8be38f]" /> : <Copy size={15} />}
    </button>
  );
}

function RunButton({ onRun }: { onRun: () => void }) {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <button
      type="button"
      onClick={() => {
        onRun();
        setSent(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setSent(false), 1400);
      }}
      aria-label={t('docs.runAria')}
      className={cn(
        'flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors',
        sent ? 'bg-white/10 text-code-ink' : 'bg-signal text-[#140803] hover:brightness-110'
      )}
    >
      {sent ? <Check size={13} /> : <Play size={12} fill="currentColor" />}
      {sent ? t('docs.running') : t('docs.run')}
    </button>
  );
}

interface CodeBlockProps {
  code: string;
  filename?: string;
  lang?: 'tsx' | 'bash';
  onRun?: () => void;
  className?: string;
}

export function CodeBlock({ code, filename, lang = 'tsx', onRun, className }: CodeBlockProps) {
  const html = useHighlighted(code, lang);
  return (
    <figure className={cn('overflow-hidden rounded-2xl bg-code text-code-ink dark:ring-1 dark:ring-line-soft', className)}>
      <figcaption className="flex h-11 items-center gap-2 border-b border-code-line pl-4 pr-2">
        <span className="truncate font-mono text-xs text-code-ink/60">{filename}</span>
        <span className="ml-auto flex items-center gap-1">
          <CopyButton text={code} />
          {onRun && <RunButton onRun={onRun} />}
        </span>
      </figcaption>
      <div className="overflow-x-auto">
        {html ? (
          // Generated locally by shiki from our own snippets.
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="shiki">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}

const MANAGERS = Object.keys(installCommands) as PackageManager[];

export function InstallCommand({ className }: { className?: string }) {
  const [pm, setPm] = useState<PackageManager>('npm');
  const command = installCommands[pm];
  return (
    <div className={cn('overflow-hidden rounded-2xl bg-code text-code-ink dark:ring-1 dark:ring-line-soft', className)}>
      <div role="tablist" aria-label="Package manager" className="flex gap-1 border-b border-code-line px-2 pt-2">
        {MANAGERS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={pm === name}
            onClick={() => setPm(name)}
            className={cn(
              'relative px-3 pb-2.5 pt-1.5 font-mono text-xs transition-colors',
              pm === name ? 'text-code-ink' : 'text-code-ink/50 hover:text-code-ink/80'
            )}
          >
            {name}
            {pm === name && (
              <span aria-hidden className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-signal" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 py-2 pl-4 pr-2">
        <span aria-hidden className="select-none font-mono text-sm text-signal">
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13.5px]">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}
