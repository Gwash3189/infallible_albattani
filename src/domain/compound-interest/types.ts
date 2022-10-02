
export enum InterestPayout {
  monthly,
  quarterly,
  annually,
  atMaturity
}

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
