import type { Grant } from '@/types'
import Badge from '@/components/ui/Badge'

interface Props {
  grants: Grant[]
}

function categoryLabel(cat: Grant['category']) {
  const map: Record<Grant['category'], string> = {
    hardware: 'Hardware',
    software: 'Software',
    research: 'Research',
    education: 'Education',
  }
  return map[cat]
}

export default function GrantLogTable({ grants }: Props) {
  const totalBTC = grants.reduce((sum, g) => sum + g.amountBTC, 0)

  return (
    <div className="overflow-x-auto">
      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-[#1f1f1f] text-gray-500 text-left">
            <th className="pb-3 pr-4 font-normal text-xs uppercase">Project</th>
            <th className="pb-3 pr-4 font-normal text-xs uppercase">Grantee</th>
            <th className="pb-3 pr-4 font-normal text-xs uppercase">Category</th>
            <th className="pb-3 pr-4 font-normal text-xs uppercase">Amount</th>
            <th className="pb-3 pr-4 font-normal text-xs uppercase">Status</th>
            <th className="pb-3 font-normal text-xs uppercase">Date</th>
          </tr>
        </thead>
        <tbody>
          {grants.map((grant) => (
            <tr key={grant.name} className="border-b border-gray-200 dark:border-[#1f1f1f] hover:bg-white dark:hover:bg-[#242424] transition-colors">
              <td className="py-3 pr-4 text-gray-900 dark:text-white font-bold">{grant.name}</td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{grant.grantee}</td>
              <td className="py-3 pr-4">
                <span className="text-xs px-2 py-0.5 rounded-none bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#1f1f1f] text-gray-600 dark:text-gray-400">
                  {categoryLabel(grant.category)}
                </span>
              </td>
              <td className="py-3 pr-4 text-[#7C3AED]">{grant.amountBTC} BTC</td>
              <td className="py-3 pr-4">
                <Badge status={grant.status} />
              </td>
              <td className="py-3 text-gray-500">{grant.dateFunded}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-[#7C3AED]">
            <td className="pt-3 pr-4 text-gray-500 font-normal">Total</td>
            <td colSpan={2} />
            <td className="pt-3 pr-4 text-[#7C3AED] font-bold">{totalBTC.toFixed(1)} BTC</td>
            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
