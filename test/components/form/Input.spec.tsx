import '@testing-library/dom'
import React from 'react'
import { Input } from '@/components/form/Input'
import { render } from '@testing-library/react'

describe(Input, () => {
  let element: HTMLElement

  describe('when there is not an error', () => {
    beforeEach(() => {
      const { getByTestId } = render(<Input data-testid='test-input' id='123'/>)
      element = getByTestId('test-input')
    })

    it('renders a described by aria label', () => {
      expect(element)
        .toHaveAttribute('aria-describedby')
    })
  })

  describe('when there is an error', () => {
    beforeEach(() => {
      const { getByTestId } = render(<Input data-testid='test-input' error id='123'/>)
      element = getByTestId('test-input')
    })

    it('renders with error classes', () => {
      expect(element.className)
        .toContain('border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500')
    })

    it('renders proper aria labels', () => {
      expect(element)
        .toHaveAttribute('aria-invalid')

      expect(element)
        .toHaveAttribute('aria-describedby')
    })
  })
})
