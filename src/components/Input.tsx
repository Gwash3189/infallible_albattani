import clsx from 'clsx'
import { DetailedHTMLProps } from 'react'

export type InputProps = {
  error?: boolean
} & DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: InputProps) {
  console.log(props.error)
  let newProps: InputProps = {
    ...props,
    className: clsx(
      'block w-full rounded-md border-gray-300 focus:border-ferocia  sm:text-sm',
      props.error === true ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : ''
    )
  }

  delete newProps.error // avoid react errors

  if (props.error !== undefined) {
    newProps = {
      ...newProps,
      'aria-invalid': true,
      'aria-describedby': props.id
    }
  }

  return (
    <input
      {...newProps}
    />
  )
}
