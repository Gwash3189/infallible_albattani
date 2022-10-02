import '@testing-library/dom'
import React from 'react'
import { FormInput } from '@/components/form/FormInput'
import { render } from '@testing-library/react'

describe(FormInput, () => {
  describe('when there is an error', () => {
    let onChangeMock: jest.Mock
    let label: HTMLElement
    let input: HTMLElement
    const id = '123'

    beforeEach(() => {
      onChangeMock = jest.fn()
      const { getByTestId } = render(
        <FormInput
          id={id}
          label='How much do you want to invest?'
          onChange={onChangeMock}
          value='10000'
          min={0}
          type='number'
          name={id}
          placeholder='10000'
        />)
      label = getByTestId(`${id}-label`)
      input = getByTestId(`${id}-input`)
    })

    it('renders a label with the provided text', () => {
      expect(label).toContainHTML('How much do you want to invest?')
    })

    it('renders an input with the provided value', () => {
      expect(input).toHaveValue(10000)
    })

    describe('when there is an error', () => {
      let errorMessage: HTMLElement

      beforeEach(() => {
        onChangeMock = jest.fn()
        const { getByTestId } = render(
          <FormInput
            id={id}
            error
            errorMessage='This is an error message'
            label='How much do you want to invest?'
            onChange={onChangeMock}
            value='10000'
            min={0}
            type='number'
            name={id}
            placeholder='10000'
          />)
        errorMessage = getByTestId(`${id}-error-message`)
      })

      it('renders the provided error message', () => {
        expect(errorMessage).toContainHTML('This is an error message')
      })
    })
  })
})
