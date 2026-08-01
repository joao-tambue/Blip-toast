import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';
import { cn } from '../../lib/cn';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div
      role="group"
      aria-label={i18n.t('nav.languageAria')}
      className="flex items-center rounded-full border border-line/70 bg-surface/60 p-0.5"
    >
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={current === code}
          className={cn(
            'cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150',
            current === code ? 'bg-ink text-night' : 'text-muted hover:text-ink'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
