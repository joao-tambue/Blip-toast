import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { installCommands } from '../../lib/site-config';
import { Tabs } from '../ui/Tabs';
import { CopyButton } from '../ui/CopyButton';
import { cn } from '../../lib/cn';

type PkgManager = keyof typeof installCommands;

const managers = Object.keys(installCommands) as PkgManager[];

interface InstallTabsProps {
  className?: string;
}

export function InstallTabs({ className }: InstallTabsProps) {
  const [active, setActive] = useState<PkgManager>('npm');
  const { t } = useTranslation();
  const command = installCommands[active];

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-[#12121b] shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-3 py-2.5">
        <Tabs<PkgManager>
          aria-label={t('installTabs.packageManagerAria')}
          value={active}
          onChange={setActive}
          tabs={managers.map((m) => ({ value: m, label: m }))}
          variant="dark"
        />
        <CopyButton text={command} label={t('installTabs.copy')} />
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="select-none text-sky" aria-hidden>
          $
        </span>
        <code className="truncate font-mono text-sm text-slate-300 sm:text-base">{command}</code>
        <motion.span
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-auto hidden shrink-0 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 sm:block"
        >
          {active}
        </motion.span>
      </div>
    </div>
  );
}
