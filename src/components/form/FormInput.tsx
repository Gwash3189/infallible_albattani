import { Input, InputProps } from '../Input'

type Props = {
  errorMessage?: string
  label: string
  id: string
} & InputProps

export function FormInput (props: Props) {
  const errorMessage = props.error !== undefined
    ? (
      <p className='mt-2 text-sm text-red-600' id='email-error'>
        {props.errorMessage}
      </p>
      )
    : null

  const newProps: InputProps = {
    ...props
  }

  return (
    <>
      <label htmlFor={props.id} className='block font-medium text-gray-700 pt-2 mb-2'>
        {props.label}
      </label>
      <div className='relative mt-1 rounded-md shadow-sm w-full md:w-1/2'>
        <Input
          {...newProps}
        />
      </div>
      {errorMessage}
    </>
  )
}
