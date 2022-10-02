import { LearnMoreModal } from '@/components/learn-more/LearnMoreModal'
import { ModalProps } from '@/components/Modal'

export function InterestRateModal ({ open, onClose }: ModalProps) {
  return (
    <LearnMoreModal open={open} title='What is the "total interest earned"?' onClose={onClose}>
      <span className='block'>
        An &quot;interest rate&quot; refers to how much additional money you&apos;ll recieve for every year your interest is with us.
      </span>
      <span className='block pt-4'>
        It&apos;s like a thank you for letting us borrow your money.
      </span>
      <span className='block pt-4'>
        For example, if your invested $100 with an interest rate of 3.0%.
        You would recieve an extra $3.00 on top of the original $100.
        This means your total interest earned is $3.00.
      </span>
    </LearnMoreModal>
  )
}
