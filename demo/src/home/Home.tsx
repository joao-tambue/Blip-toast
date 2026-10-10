import { ArrowRight } from 'lucide-react';
import toast, { ToastContainer } from 'blip-toast';
import { useTranslation } from 'react-i18next';
import { BlipBot, BlipStatus, useBlipMood } from '../components/Blip';
import { Footer, Header } from '../components/Chrome';
import { InstallCommand } from '../components/Code';
import i18n from '../i18n';
import { inline } from '../lib/md';
import { installCommands, routes } from '../lib/site-config';
import { useSiteTheme } from '../lib/theme-store';

type SendKind = 'success' | 'error' | 'promise' | 'action';

const SEND_KINDS: SendKind[] = ['success', 'error', 'promise', 'action'];

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function send(kind: SendKind) {
  const t = i18n.t;
  switch (kind) {
    case 'success':
      toast.success(t('toast.saved'), { description: t('toast.savedDesc') });
      break;
    case 'error':
      toast.error(t('toast.failed'), { description: t('toast.failedDesc') });
      break;
    case 'promise':
      toast.promise(wait(2400), {
        loading: t('toast.loading'),
        success: t('toast.done'),
        error: t('toast.rejected'),
        description: { success: t('toast.doneDesc') },
      });
      break;
    case 'action':
      toast(t('toast.deleted'), {
        description: t('toast.deletedDesc'),
        duration: 6000,
        action: { label: t('toast.undo'), successLabel: t('toast.restored'), onPress: () => {} },
      });
      break;
  }
}

/** Renders a sentence whose final full stop becomes the signal blip. */
function BlipSentence({ text }: { text: string }) {
  const ends = text.endsWith('.');
  return (
    <>
      {ends ? text.slice(0, -1) : text}
      {ends && <span className="blip-dot ml-[0.06em] align-baseline" aria-hidden />}
      {ends && <span className="sr-only">.</span>}
    </>
  );
}

function Hero() {
  const { t } = useTranslation();
  const { mood, state, count } = useBlipMood();

  return (
    <section className="mx-auto grid max-w-[88rem] grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-14">
      <div className="lg:col-span-7">
        <h1 className="animate-rise font-display text-[clamp(2.35rem,5.4vw,4.9rem)] font-medium leading-[1.04] tracking-[-0.04em] text-balance">
          <BlipSentence text={t('home.title')} />
        </h1>
        <p
          className="animate-rise mt-6 max-w-xl text-[17px] leading-relaxed text-slate [animation-delay:80ms] has-code sm:text-lg"
        >
          {inline(t('home.lede'))}
        </p>
        <div className="animate-rise mt-9 max-w-xl [animation-delay:160ms]">
          <InstallCommand />
          <a
            href={routes.docs}
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-fog transition-transform hover:-translate-y-px"
          >
            {t('home.readDocs')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="animate-rise flex flex-col items-center rounded-[36px] border border-line-soft bg-paper px-5 pb-6 pt-8 [animation-delay:120ms] sm:px-8">
          <BlipBot size={208} state={state} dressed pokeable />
          <BlipStatus mood={mood} count={count} className="mt-2" />

          <div className="mt-7 w-full border-t border-line-soft pt-5">
            <p className="text-center text-sm text-slate">{t('home.send')}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SEND_KINDS.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => send(kind)}
                  aria-label={t('home.sendAria', { kind: t(`home.kinds.${kind}`) })}
                  className="rounded-full border border-line bg-chalk px-4 py-2 font-mono text-[12.5px] text-ink transition-colors hover:border-ink/40 active:scale-[0.97]"
                >
                  {t(`home.kinds.${kind}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { key: 'install', code: installCommands.npm },
  { key: 'mount', code: '<ToastContainer />' },
  { key: 'call', code: "toast.success('Saved')" },
] as const;

function Steps() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="steps-title" className="mx-auto max-w-[88rem] px-4 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-10">
        <h2 id="steps-title" className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
          {t('home.stepsTitle')}
        </h2>
        <a
          href={`${routes.docs}#installation`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-text hover:underline"
        >
          {t('home.stepsLink')}
          <ArrowRight size={15} />
        </a>
      </div>

      <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, i) => (
          <li key={step.key} className="relative flex flex-col">
            <div className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold text-fog">
                {i + 1}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {t(`home.steps.${step.key}.title`)}
            </h3>
            <p className="mt-1 max-w-sm text-[15px] leading-relaxed text-slate">
              {t(`home.steps.${step.key}.body`)}
            </p>
            <code className="mt-4 block overflow-x-auto whitespace-nowrap rounded-xl bg-code px-4 py-3 font-mono dark:ring-1 dark:ring-line-soft text-[12.5px] text-code-ink md:mt-auto md:translate-y-4">
              {step.code}
            </code>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Closing() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[88rem] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-6 rounded-[36px] bg-ink px-6 py-8 text-fog sm:flex-row sm:items-center sm:gap-8 sm:px-10">
        <BlipBot size={108} state="sleeping" className="-my-2 shrink-0" />
        <div className="max-w-xl">
          <h2 className="font-display text-xl font-medium tracking-[-0.03em] sm:text-2xl">
            {t('home.closingTitle')}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-fog/70">{t('home.closingBody')}</p>
        </div>
        <a
          href={routes.docs}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-[#140803] transition-transform hover:-translate-y-px sm:ml-auto"
        >
          {t('home.closingCta')}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}

export function Home() {
  const theme = useSiteTheme();
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header page="home" />
      <main id="content">
        <Hero />
        <Steps />
        <Closing />
      </main>
      <Footer />
      <ToastContainer position="top" theme={theme} />
    </div>
  );
}
