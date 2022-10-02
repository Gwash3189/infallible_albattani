import { z, ZodError } from 'zod'
import { CalculationOutputs, CalculationInputs, CalculationErrors, ParsedCalculationInputs, InterestPayout } from '@/domain/compound-interest/types'

type CompoundInterestOutput = Omit<CalculationOutputs, 'errors'>

export function getTotalMonths (years: number, months: number): number {
  return (years * 12) + months
}

export function validateInput (input: CalculationInputs) {
  const floatGuard = z.preprocess(
    (value) => parseFloat(z.string().parse(value)),
    z.number().positive()
  )

  const yearsGuard = z.preprocess(
    (value) => parseInt(z.string().parse(value), 10),
    z.number().positive().max(5)
  )

  const monthsGuard = z.preprocess(
    (value) => parseInt(z.string().parse(value), 10),
    z.number().max(11).min(0)
  )

  return z.object({
    initialInvestment: floatGuard,
    annualInterestRate: floatGuard,
    years: yearsGuard,
    months: monthsGuard
  }).safeParse(input)
}

export function parseErrorMessages (error: ZodError): CalculationErrors {
  const flattenedErrors = error.flatten()
  return flattenedErrors.fieldErrors
}

export function getTotalYearsInDecimalValue (years: number, months: number): number {
  return getTotalMonths(years, months) / 12
}

export function parseAnnualInterestRate (annualInterestRate: number): number {
  return annualInterestRate / 100
}

export function calculateCompoundInterest (input: ParsedCalculationInputs, numberOfReinvestments: number): CompoundInterestOutput {
  const annualInterestRate = parseAnnualInterestRate(input.annualInterestRate)
  const total = Math.round(
    input.initialInvestment * (
      Math.pow(
        (1 + (annualInterestRate / numberOfReinvestments)),
        (numberOfReinvestments * getTotalYearsInDecimalValue(input.years, input.months))
      )
    )
  )
  const interestEarned = total - input.initialInvestment

  return {
    total,
    interestEarned
  }
}

export function calculateAndPayMonthly (input: ParsedCalculationInputs): CalculationOutputs {
  const numberOfReinvestments = getTotalMonths(input.years, input.months) // find how many quarters are in the decimal (3 years in months is 36. 36 / 3 is 12)
  const { total, interestEarned } = calculateCompoundInterest(input, numberOfReinvestments)

  return {
    interestEarned,
    total,
    errors: {}
  }
}

export function calculateAndPayQuarterly (input: ParsedCalculationInputs): CalculationOutputs {
  const monthsInAQuarter = 3
  const numberOfReinvestments = getTotalMonths(input.years, input.months) / monthsInAQuarter // find how many quarters are in the decimal (3 years in months is 36. 36 / 3 is 12)
  const { total, interestEarned } = calculateCompoundInterest(input, numberOfReinvestments)

  return {
    interestEarned,
    total,
    errors: {}
  }
}

export function calculateAndPayAnnually (input: ParsedCalculationInputs): CalculationOutputs {
  const totalYears = getTotalYearsInDecimalValue(input.years, input.months) // 3 years and 0 months -> 3.0
  const numberOfReinvestments = Math.floor(totalYears) // its only reinvested once a year, so round down any decimals
  const { total, interestEarned } = calculateCompoundInterest(input, numberOfReinvestments)

  return {
    interestEarned,
    total,
    errors: {}
  }
}

export function calculateAndPayAtMaturity (input: ParsedCalculationInputs): CalculationOutputs {
  const totalYearsInDecimalValue = getTotalYearsInDecimalValue(input.years, input.months)
  const interestEarned = Math.round(
    (
      (input.initialInvestment * (parseAnnualInterestRate(input.annualInterestRate))) *
        totalYearsInDecimalValue
    )
  )
  const total = input.initialInvestment + interestEarned
  return {
    interestEarned,
    total,
    errors: {}
  }
}

export function calculate (input: CalculationInputs): CalculationOutputs {
  const result = validateInput(input)

  if (!result.success) {
    return {
      interestEarned: 0,
      total: 0,
      errors: parseErrorMessages(result.error)
    }
  }

  switch (input.mode) {
    case InterestPayout.atMaturity:
      return calculateAndPayAtMaturity(result.data)
    case InterestPayout.annually:
      return calculateAndPayAnnually(result.data)
    case InterestPayout.quarterly:
      return calculateAndPayQuarterly(result.data)
    case InterestPayout.monthly:
      return calculateAndPayMonthly(result.data)

    default:
      return calculateAndPayAtMaturity(result.data)
  }
}
