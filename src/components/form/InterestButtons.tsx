import { InterestPayout } from '@/domain/compound-interest/types'
import { InterestButton } from '@/components/form/InterestButton'

interface Props {
  onClick: (mode: InterestPayout) => void
  mode: InterestPayout
}

export function InterestButtons ({ onClick, mode }: Props) {
  return (
    <>
      <label className='block font-medium text-gray-700'>
        When will we pay your interest out?
      </label>
      <span className='isolate inline-flex rounded-md shadow-sm pt-6 w-full first:rounded-l-md last:rounded-r-md'>
        <InterestButton
          start
          onClick={() => onClick(InterestPayout.monthly)}
          active={mode === InterestPayout.monthly}
          mode={InterestPayout.monthly}
        >
          Monthly
        </InterestButton>
        <InterestButton
          onClick={() => onClick(InterestPayout.quarterly)}
          active={mode === InterestPayout.quarterly}
          mode={InterestPayout.quarterly}
        >
          Quarterly
        </InterestButton>
        <InterestButton
          onClick={() => onClick(InterestPayout.annually)}
          active={mode === InterestPayout.annually}
          mode={InterestPayout.annually}
        >
          Annually
        </InterestButton>
        <InterestButton
          end
          onClick={() => onClick(InterestPayout.atMaturity)}
          active={mode === InterestPayout.atMaturity}
          mode={InterestPayout.atMaturity}
        >
          At Maturity
        </InterestButton>
      </span>
    </>
  )
}
