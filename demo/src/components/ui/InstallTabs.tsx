import { useState } from 'react';
import { motion } from 'framer-motion';
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
          aria-label="Package manager"
          value={active}
          onChange={setActive}
          tabs={managers.map((m) => ({ value: m, label: m }))}
        />
        <CopyButton text={command} label="Copy" />
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="select-none text-sky" aria-hidden>
          $
        </span>
        <code className="truncate font-mono text-sm text-ink sm:text-base">{command}</code>
        <motion.span
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-auto hidden shrink-0 rounded-md border border-line/80 bg-surface/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted sm:block"
        >
          {active}
        </motion.span>
      </div>
    </div>
  );
}
