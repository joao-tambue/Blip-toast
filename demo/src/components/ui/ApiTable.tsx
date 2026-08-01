import { useTranslation } from 'react-i18next';
import type { ApiRow } from '../../lib/toast-examples';

interface ApiTableProps {
  rows: ApiRow[];
}

export function ApiTable({ rows }: ApiTableProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-night/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface/50">
              <th className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                {t('api.table.name')}
              </th>
              <th className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                {t('api.table.type')}
              </th>
              <th className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                {t('api.table.default')}
              </th>
              <th className="hidden px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted sm:table-cell">
                {t('api.table.description')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-b border-line/50 align-top transition-colors last:border-0 hover:bg-surface/30"
              >
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[13px] font-medium text-sky">
                  {row.name}
                </td>
                <td className="px-4 py-3 font-mono text-[12px] leading-relaxed text-violet/90">
                  {row.type}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-muted">
                  {row.default}
                </td>
                <td className="hidden px-4 py-3 text-[13px] leading-relaxed text-muted sm:table-cell">
                  {t(row.descriptionKey)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
