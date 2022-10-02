import { useState } from 'react'
import { StatsBlock, StatsBlockProps } from '@/components/stats/StatsBlock'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import { FinalBalanceModal } from '@/components/learn-more/FinalBalanceModal'

type Props = Omit<StatsBlockProps, 'onClick' | 'children' | 'key' | 'title'>

export function FinalBalance ({ stat }: Props) {
  const [open, setOpen] = useState(false)
  return (
      <StatsBlock stat={stat} title='Final Balance' onClick={() => setOpen(true)}>
        <CreditCardIcon className="h-6 w-6 text-white" aria-hidden="true" /> {/* invisible to accessability tech */}
        <FinalBalanceModal open={open} onClose={() => setOpen(false)} />
      </StatsBlock>
  )
}
