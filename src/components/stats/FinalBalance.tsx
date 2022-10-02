import { useState } from 'react'
import { Block, BlockProps } from '@/components/stats/StatsBlock'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import { FinalBalanceModal } from '@/components/learn-more/FinalBalanceModal'

type Props = Omit<BlockProps, 'onClick' | 'children' | 'key' | 'title'>

export function FinalBalance ({ stat }: Props) {
  const [open, setOpen] = useState(false)
  return (
      <Block stat={stat} title='Final Balance' onClick={() => setOpen(true)}>
        <CreditCardIcon className="h-6 w-6 text-white" aria-hidden="true" />
        <FinalBalanceModal open={open} onClose={() => setOpen(false)} />
      </Block>
  )
}
