import { useState } from 'react'
import { StatsBlock, StatsBlockProps } from '@/components/stats/StatsBlock'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { InterestRateModal } from '@/components/learn-more/TotalInterestEarnedModal'

type Props = Omit<StatsBlockProps, 'onClick' | 'children' | 'key' | 'title'>

export function TotalInterestEarned ({ stat }: Props) {
  const [open, setOpen] = useState(false)
  return (
      <StatsBlock stat={stat} title='Total Interest Earned' onClick={() => setOpen(true)}>
        <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <InterestRateModal open={open} onClose={() => setOpen(false)} />
      </StatsBlock>
  )
}
