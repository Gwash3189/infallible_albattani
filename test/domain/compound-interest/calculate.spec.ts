import { calculate, calculateAndPayAnnually, calculateAndPayAtMaturity, calculateAndPayMonthly, calculateAndPayQuarterly, getTotalMonths, getTotalYearsInDecimalValue, parseErrorMessages, validateInput } from '@/domain/compound-interest/calculate'
import { InterestPayout } from '@/domain/compound-interest/types'
import { ZodError } from 'zod'

describe(validateInput, () => {
  describe('when the input is invalid', () => {
    const input = {
      initialInvestment: '-1',
      annualInterestRate: '-1',
      months: '12',
      years: '6',
      mode: InterestPayout.annually
    }

    expect(validateInput(input)).toHaveProperty('success', false)
  })
})

describe(getTotalMonths, () => {
  describe('when the investment is less than a year', () => {
    it('returns the number of months', () => {
      expect(getTotalMonths(0, 11)).toEqual(11)
    })
  })

  describe('when the investment is greater than a year', () => {
    it('returns the number of months + the number of years in months', () => {
      expect(getTotalMonths(1, 11)).toEqual(23)
    })
  })
})

describe(parseErrorMessages, () => {
  let errorMock: ZodError
  const fieldErrors = {}
  let result: any

  beforeEach(() => {
    errorMock = {
      flatten: jest.fn(() => ({ fieldErrors }))
    } as unknown as ZodError

    result = parseErrorMessages(errorMock)
  })

  it('flattens the errors messages', () => {
    expect(errorMock.flatten).toHaveBeenCalled()
  })

  it('returns the field errors', () => {
    expect(result).toEqual(fieldErrors)
  })
})

describe(getTotalYearsInDecimalValue, () => {
  describe('when the investment is less than a year', () => {
    it('returns the number of months in a decimal', () => {
      expect(getTotalYearsInDecimalValue(0, 6)).toEqual(0.5)
    })
  })

  describe('when the investment is greater than a year', () => {
    it('returns the number of months + the number of years in months', () => {
      expect(getTotalYearsInDecimalValue(1, 6)).toEqual(1.5)
    })
  })
})

describe(calculateAndPayAtMaturity, () => {
  const input = {
    initialInvestment: 10_000,
    annualInterestRate: 1.10,
    years: 3,
    months: 0,
    mode: InterestPayout.atMaturity
  }

  describe(
    'when the investment has an interest rate of 1.10,' +
    'initial investment of 10,000, ' +
    'is invested for three years, ' +
    'and it\'s interest is payed at maturity', () => {
      it('has a total of $10,334', () => {
        expect(calculateAndPayAtMaturity(input)).toEqual({
          total: 10330,
          interestEarned: 330,
          errors: {}
        })
      })

      describe('when the investment is invested for 3 1/2 years', () => {
        const input = {
          initialInvestment: 10_000,
          annualInterestRate: 1.10,
          years: 3,
          months: 6,
          mode: InterestPayout.atMaturity
        }

        it('handles the decimal number of time', () => {
          expect(calculateAndPayAtMaturity(input)).toEqual({
            total: 10385,
            interestEarned: 385,
            errors: {}
          })
        })
      })
    })
})

describe(calculateAndPayAnnually, () => {
  const input = {
    initialInvestment: 10_000,
    annualInterestRate: 1.10,
    years: 3,
    months: 0,
    mode: InterestPayout.annually
  }

  describe(
    'when the investment has an interest rate of 1.10,' +
    'initial investment of 10,000, ' +
    'is invested for three years, ' +
    'and it\'s interest is payed at maturity', () => {
      it('has a total of $10,334', () => {
        expect(calculateAndPayAnnually(input)).toEqual({
          total: 10334,
          interestEarned: 334,
          errors: {}
        })
      })

      describe('when the investment is invested for 3 1/2 years', () => {
        const input = {
          initialInvestment: 10_000,
          annualInterestRate: 1.10,
          years: 3,
          months: 6,
          mode: InterestPayout.annually
        }

        it('handles the decimal number of time', () => {
          expect(calculateAndPayAnnually(input)).toEqual({
            total: 10391,
            interestEarned: 391,
            errors: {}
          })
        })
      })
    })
})

describe(calculateAndPayQuarterly, () => {
  const input = {
    initialInvestment: 10_000,
    annualInterestRate: 1.10,
    years: 3,
    months: 0,
    mode: InterestPayout.quarterly
  }

  describe(
    'when the investment has an interest rate of 1.10,' +
    'initial investment of 10,000, ' +
    'is invested for three years, ' +
    'and it\'s interest is payed at maturity', () => {
      it('has a total of $10,334', () => {
        expect(calculateAndPayQuarterly(input)).toEqual({
          total: 10335,
          interestEarned: 335,
          errors: {}
        })
      })

      describe('when the investment is invested for 3 1/2 years', () => {
        const input = {
          initialInvestment: 10_000,
          annualInterestRate: 1.10,
          years: 3,
          months: 6,
          mode: InterestPayout.quarterly
        }

        it('handles the decimal number of time', () => {
          expect(calculateAndPayQuarterly(input)).toEqual({
            total: 10392,
            interestEarned: 392,
            errors: {}
          })
        })
      })
    })
})

describe(calculateAndPayMonthly, () => {
  const input = {
    initialInvestment: 10_000,
    annualInterestRate: 1.10,
    years: 3,
    months: 0,
    mode: InterestPayout.quarterly
  }

  describe(
    'when the investment has an interest rate of 1.10,' +
    'initial investment of 10,000, ' +
    'is invested for three years, ' +
    'and it\'s interest is payed at maturity', () => {
      it('has a total of $10,334', () => {
        expect(calculateAndPayMonthly(input)).toEqual({
          total: 10335,
          interestEarned: 335,
          errors: {}
        })
      })

      describe('when the investment is invested for 3 1/2 years', () => {
        const input = {
          initialInvestment: 10_000,
          annualInterestRate: 1.10,
          years: 3,
          months: 6,
          mode: InterestPayout.quarterly
        }

        it('handles the decimal number of time', () => {
          expect(calculateAndPayAnnually(input)).toEqual({
            total: 10391,
            interestEarned: 391,
            errors: {}
          })
        })
      })
    })
})

describe(calculate, () => {
  const input = {
    initialInvestment: '10000',
    annualInterestRate: '1.10',
    years: '3',
    months: '0'
  }

  describe('when the provided input is invalid', () => {
    const invalidInput = {
      ...input,
      initialInvestment: '-25'
    }

    it('returns the errors', () => {
      expect(calculate({
        ...invalidInput,
        mode: InterestPayout.atMaturity
      })).toHaveProperty('errors', {
        initialInvestment: expect.arrayContaining([
          expect.any(String)
        ])
      })
    })
  })

  describe('when the InterestPayout mode is set to atMaturity', () => {
    it('returns an investment that was reinvested at maturity', () => {
      expect(calculate({
        ...input,
        mode: InterestPayout.atMaturity
      })).toEqual({
        total: 10330,
        interestEarned: 330,
        errors: {}
      })
    })
  })

  describe('when the InterestPayout mode is set to annually', () => {
    it('returns an investment that was reinvested annually', () => {
      expect(calculate({
        ...input,
        mode: InterestPayout.annually
      })).toEqual({
        total: 10334,
        interestEarned: 334,
        errors: {}
      })
    })
  })

  describe('when the InterestPayout mode is set to quarterly', () => {
    it('returns an investment that was reinvested quarterly', () => {
      expect(calculate({
        ...input,
        mode: InterestPayout.quarterly
      })).toEqual({
        total: 10335,
        interestEarned: 335,
        errors: {}
      })
    })
  })

  describe('when the InterestPayout mode is set to monthly', () => {
    expect(calculate({
      ...input,
      mode: InterestPayout.monthly
    })).toEqual({
      total: 10335,
      interestEarned: 335,
      errors: {}
    })
  })
})
