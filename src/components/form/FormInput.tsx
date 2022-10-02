import { Input, InputProps } from './Input'

type Props = {
  errorMessage?: string
  label: string
  id: string
} & InputProps

export function FormInput (props: Props) {
  const errorMessage = props.error === true
    ? (
      <p data-testid={`${props.id}-error-message`} className='mt-2 text-sm text-red-600' id='email-error'>
        {props.errorMessage}
      </p>
      )
    : null

  const newProps = {
    ...props
  }

  delete newProps.errorMessage

  return (
    <>
      <label data-testid={`${props.id}-label`} htmlFor={props.id} className='block font-medium text-gray-700 pt-2 mb-2'>
        {props.label}
      </label>
      <div className='relative mt-1 rounded-md shadow-sm w-full md:w-1/2'>
        <Input
          data-testid={`${props.id}-input`}
          {...newProps}
        />
      </div>
      {errorMessage}
    </>
  )
}
