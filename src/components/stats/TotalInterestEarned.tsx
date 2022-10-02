import { useState } from 'react'
import { Block, BlockProps } from '@/components/stats/StatsBlock'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { InterestRateModal } from '@/components/learn-more/TotalInterestEarnedModal'

type Props = Omit<BlockProps, 'onClick' | 'children' | 'key' | 'title'>

export function TotalInterestEarned ({ stat }: Props) {
  const [open, setOpen] = useState(false)
  return (
      <Block stat={stat} title='Total Interest Earned' onClick={() => setOpen(true)}>
        <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <InterestRateModal open={open} onClose={() => setOpen(false)} />
      </Block>
  )
}
