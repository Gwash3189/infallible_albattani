import '@testing-library/dom'
import React from 'react'
import { InterestButtons } from '@/components/form/InterestButtons'
import { render, fireEvent } from '@testing-library/react'
import { InterestPayout } from '@/domain/compound-interest/types'

describe(InterestButtons, () => {
  describe('when there is an error', () => {
    let element: HTMLElement
    let onClickMock: jest.Mock
    let monthly: Element
    let quarterly: Element
    let annually: Element
    let atMaturity: Element

    beforeEach(() => {
      onClickMock = jest.fn()
      const { getByTestId } = render(
        <InterestButtons
          mode={InterestPayout.atMaturity}
          onClick={onClickMock}
        />
      )
      element = getByTestId('interest-buttons-container')
      monthly = element.children[0] as Element
      quarterly = element.children[1] as Element
      annually = element.children[2] as Element
      atMaturity = element.children[3] as Element
    })

    it('renders all the expected buttons in the correct order', () => {
      expect(monthly).toContainHTML('Monthly')
      expect(quarterly).toContainHTML('Quarterly')
      expect(annually).toContainHTML('Annually')
      expect(atMaturity).toContainHTML('At Maturity')
    })

    it('renders rounded corners on the start and finish of the buttons', () => {
      expect(monthly?.className).toContain('rounded-l-md')
      expect(atMaturity?.className).toContain('rounded-r-md')
    })

    describe('when a button is selected', () => {
      it('renders that button as active', () => {
        expect(atMaturity?.className).toContain('bg-gray-100 hover:bg-gray-100')
      })
    })

    describe('when a button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(monthly)
        fireEvent.click(quarterly)
        fireEvent.click(annually)
        fireEvent.click(atMaturity)
      })

      it('passes through the correct InterestPayout', () => {
        expect(onClickMock).toHaveBeenCalledWith(InterestPayout.monthly)
        expect(onClickMock).toHaveBeenCalledWith(InterestPayout.quarterly)
        expect(onClickMock).toHaveBeenCalledWith(InterestPayout.annually)
        expect(onClickMock).toHaveBeenCalledWith(InterestPayout.atMaturity)
      })
    })
  })
})
