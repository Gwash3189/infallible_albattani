import { InterestPayout } from '@/domain/compound-interest/types'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type Props = {
  onClick: (mode: InterestPayout) => void
  mode: InterestPayout
  active: boolean
  start?: boolean
  end?: boolean
} & PropsWithChildren

export function InterestButton ({ onClick, children, mode, active, start, end }: Props) {
  const startClasses = start === true ? 'rounded-l-md' : ''
  const endClasses = end === true ? 'rounded-r-md' : ''
  const classes = 'relative inline-flex items-center flex-auto px-2 py-2 justify-center border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-ferocia focus:outline-none focus:ring-1 focus:ring-ferocia'
  const activeClasses = active ? 'bg-gray-100 hover:bg-gray-100' : ''

  return (
    <button
      onClick={() => onClick(mode)}
      type='button'
      className={clsx(classes, activeClasses, startClasses, endClasses)}
    >
    {children}
  </button>
  )
}
