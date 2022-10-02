import { LearnMoreModal } from '@/components/learn-more/LearnMoreModal'
import { ModalProps } from '@/components/Modal'

export function FinalBalanceModal ({ open, onClose }: ModalProps) {
  return (
    <LearnMoreModal open={open} title={'What is a "final balance"?'} onClose={onClose}>
      <span className='block'>
        Your final balance is the amount that is reinvested when the term deposit reaches
        maturity.
      </span>
    </LearnMoreModal>
  )
}
