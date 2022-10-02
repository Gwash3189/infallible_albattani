import { z, ZodError } from 'zod'

interface CalculationInputs {
  initialInvestment: string
  annualInterestRate: string
  years: string
  months: string
}

interface CalculationOutputs {
  interestEarned: number
  total: number
  errors: CalculationErrors
}

interface CalculationErrors {
  initialInvestment?: string[]
  annualInterestRate?: string[]
  years?: string[]
  months?: string[]
}

function getTotalMonths(years: number, months: number): number {
  return (years * 12) + months
}


function validateInput (input: CalculationInputs) {
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

function parseErrorMessages (error: ZodError): CalculationErrors {
  const flattenedErrors = error.flatten()
  return flattenedErrors.fieldErrors
}

export function calculateCompoundInterest (input: CalculationInputs): CalculationOutputs {
  const result = validateInput(input)

  if (!result.success) {
    return {
      interestEarned: 0,
      total: 0,
      errors: parseErrorMessages(result.error)
    }
  }

  const totalYearsInDecimalValue = getTotalMonths(result.data.years, result.data.months) / 12
  const interestEarned = Math.round(((result.data.initialInvestment * (result.data.annualInterestRate / 100)) * totalYearsInDecimalValue))
  const total = result.data.initialInvestment + interestEarned
  return {
    interestEarned,
    total,
    errors: {}
  }
}
