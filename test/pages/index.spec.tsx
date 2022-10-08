import Home from '@/pages/index'
import { render, screen, fireEvent } from '@testing-library/react'

describe(Home, () => {
  let initialInvestmentInput: HTMLElement

  describe('when the page is loaded', () => {
    beforeEach(() => {
      render(
        <Home/>
      )
      initialInvestmentInput = screen.getByTestId('investmentAmount-input')
    })

    describe('when the initial investment input is rendered', () => {
      it('it has a default value of 10000', () => {
        expect(initialInvestmentInput).toHaveValue(10000)
      })

      it('it has no errors', () => {
        expect(screen.queryByTestId('investmentAmount-error-message')).toBeNull()
      })

      it('it has a minimum amount of 0', () => {
        expect(screen.queryByTestId('investmentAmount-input')).toHaveAttribute('min', '0')
      })
    })

    describe('when the interest rate input is rendered', () => {
      it('it has a default value of 1.10', () => {
        expect(screen.getByTestId('interestRate-input')).toHaveValue(1.10)
      })

      it('it has no errors', () => {
        expect(screen.queryByTestId('interestRate-error-message')).toBeNull()
      })

      it('it has a minimum amount of 0', () => {
        expect(screen.queryByTestId('interestRate-input')).toHaveAttribute('min', '0.1')
      })

      it('it has a minimum steo of 0.01', () => {
        expect(screen.queryByTestId('interestRate-input')).toHaveAttribute('step', '0.01')
      })
    })

    describe('when the years input is rendered', () => {
      it('it has a default value of 3', () => {
        expect(screen.getByTestId('investmentTermYears-input')).toHaveValue(3)
      })

      it('it has no errors', () => {
        expect(screen.queryByTestId('investmentTermYears-error-message')).toBeNull()
      })
    })

    describe('when the months input is rendered', () => {
      it('it has a default value of 0', () => {
        expect(screen.getByTestId('investmentTermMonths-input')).toHaveValue(0)
      })

      it('it has no errors', () => {
        expect(screen.queryByTestId('investmentTermMonths-error-message')).toBeNull()
      })
    })

    describe('when the stat blocks are rendered', () => {
      describe('when the total interest earned block is rendered', () => {
        it('it contains the expected total interest', () => {
          expect(screen.getByTestId('total-interest-earned')).toContainHTML('$330')
        })
      })

      describe('when the final balance earned block is rendered', () => {
        it('it contains the expected final balance', () => {
          expect(screen.getByTestId('final-balance')).toContainHTML('$10330')
        })
      })
    })
  })

  describe('when the initial investment value is changed', () => {
    let interestEarnedStatBlock: HTMLElement
    let finalBalanceStatBlock: HTMLElement

    beforeEach(() => {
      render(
        <Home/>
      )

      interestEarnedStatBlock = screen.getByTestId('total-interest-earned')
      finalBalanceStatBlock = screen.getByTestId('final-balance')
      initialInvestmentInput = screen.getByTestId('investmentAmount-input')
    })

    it('updates the interest earned', () => {
      expect(interestEarnedStatBlock).toContainHTML('$330')

      fireEvent.change(initialInvestmentInput, { target: { value: '10500' } })

      expect(interestEarnedStatBlock).toContainHTML('$347')
    })

    it('updates the final balance', () => {
      expect(finalBalanceStatBlock).toContainHTML('$10330')

      fireEvent.change(initialInvestmentInput, { target: { value: '10500' } })

      expect(finalBalanceStatBlock).toContainHTML('$10847')
    })
  })

  describe('when the interest payout is changed', () => {
    let interestEarnedStatBlock: HTMLElement
    let finalBalanceStatBlock: HTMLElement
    let interestButtonConatiner: HTMLElement
    let monthlyPayoutButton: Element

    beforeEach(() => {
      render(
        <Home/>
      )

      interestEarnedStatBlock = screen.getByTestId('total-interest-earned')
      finalBalanceStatBlock = screen.getByTestId('final-balance')
      initialInvestmentInput = screen.getByTestId('investmentAmount-input')
      interestButtonConatiner = screen.getByTestId('interest-buttons-container')
      monthlyPayoutButton = interestButtonConatiner.children[0] as Element
    })

    it('updates the interest earned', () => {
      expect(interestEarnedStatBlock).toContainHTML('$330')

      fireEvent.click(monthlyPayoutButton)

      expect(interestEarnedStatBlock).toContainHTML('$335')
    })

    it('updates the final balance', () => {
      expect(finalBalanceStatBlock).toContainHTML('$10330')

      fireEvent.click(monthlyPayoutButton)

      expect(finalBalanceStatBlock).toContainHTML('$10335')
    })
  })
})
