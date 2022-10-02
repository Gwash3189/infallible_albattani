import { PropsWithChildren } from 'react'

export type StatsBlockProps = {
  onClick: (value: boolean) => void
  title: string
  stat: string
} & PropsWithChildren

export function StatsBlock ({ onClick, title, stat, children }: BlockProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-6 shadow sm:px-6 sm:pt-6"
    >
      <dt>
        <div className="absolute rounded-md bg-ferocia p-3">
          {children}
        </div>
        <p className="ml-16 truncate text-sm font-medium text-ferocia">{title}</p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{stat}</p>
        <div className="absolute inset-x-0 bottom-0 bg-gray-50 p-2 sm:px-6">
          <div className="text-xs">
            <a href="#" onClick={() => onClick(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
              {' '}
              Learn more<span className="sr-only"> {title} stats</span>
            </a>
          </div>
        </div>
      </dd>
    </div>
  )
}
