
// represents when the interest is reinvested back into the term deposit
export enum InterestPayout {
  monthly,
  quarterly,
  annually,
  atMaturity
}

// I chose to use an object here
// to avoid additional mental-load
// when dealing with a large number
// of function inputs

export interface CalculationInputs {
  initialInvestment: string
  annualInterestRate: string
  years: string
  months: string
  mode: InterestPayout
}

export interface ParsedCalculationInputs {
  initialInvestment: number
  annualInterestRate: number
  years: number
  months: number
}

// to enable multiple values being returned,
// I chose to return an object. This also
// improve developer ergonomics by providing
// easy access to errors

export interface CalculationOutputs {
  interestEarned: number
  total: number
  errors: CalculationErrors
}

export interface CalculationErrors {
  initialInvestment?: string[]
  annualInterestRate?: string[]
  years?: string[]
  months?: string[]
}
