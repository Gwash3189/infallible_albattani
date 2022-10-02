import Head from 'next/head'
import { useState } from 'react'
import { TotalInterestEarned } from '@/components/stats/TotalInterestEarned'
import { FinalBalance } from '@/components/stats/FinalBalance'
import { calculate } from '@/domain/compound-interest/calculate'
import { InterestPayout } from '@/domain/compound-interest/types'
import { FormInput } from '@/components/form/FormInput'
import { getFirstErrorMessage, hasErrors } from '@/domain/formErrors'
import { InterestButtons } from '@/components/form/InterestButtons'

// the main controlling component.
// organises state, hooks and event handlers
// at this layer of the app, we deal with strings.
// this is to simplify the noise generated by JS
// when going between strings, integers and floats

const Home = () => {
  const [initialInvestment, setInitialInvestment] = useState('10000')
  const [interestRate, setInterestRate] = useState('1.10')
  const [totalYears, setTotalYears] = useState('3')
  const [totalMonths, setTotalMonths] = useState('0')
  const [interestPayoutMode, setInterestPayoutMode] = useState<InterestPayout>(InterestPayout.atMaturity)
  const { total, interestEarned, errors } = calculate({
    annualInterestRate: interestRate,
    years: totalYears,
    months: totalMonths,
    initialInvestment,
    mode: interestPayoutMode
  })

  return (
    <>
      <Head>
        <title>Ferocia - Home Loans</title>
      </Head>
      <div className='flex'>
        <div className='m-auto w-full p-4 md:p-16 min-h-[1050px] max-w-[1050px]'>
          <div className='rounded-md shadow-lg w-full grid grid-cols-1 md:grid-cols-3 gap-3 p-4'>
            <div className='col-span-2 mr-4'>
              <FormInput
                label='How much do you want to invest?'
                id='investmentAmount'
                error={hasErrors(errors.initialInvestment)}
                errorMessage={getFirstErrorMessage(errors.initialInvestment)}
                value={initialInvestment}
                onChange={(event) => {
                  setInitialInvestment(event.target.value)
                }}
                min={0}
                type='number'
                name='investmentAmount'
                placeholder='10000'
              />
              <FormInput
                label='At what interest rate?'
                error={hasErrors(errors.annualInterestRate)}
                errorMessage={getFirstErrorMessage(errors.annualInterestRate)}
                value={interestRate}
                onChange={(event) => setInterestRate(event.target.value)}
                min={0.1}
                type='number'
                step={0.01}
                name='interestRate'
                id='interestRate'
                className='block w-full rounded-md border-gray-300 focus:border-ferocia sm:text-sm'
                placeholder='1.10'
              />
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='col-span-1'>
                  <FormInput
                    label='For how many years?'
                    min={0}
                    max={5}
                    error={hasErrors(errors.years)}
                    errorMessage={getFirstErrorMessage(errors.years)}
                    value={totalYears}
                    onChange={(event) => setTotalYears(event.target.value)}
                    type='number'
                    name='investmentTermYears'
                    id='investmentTermYears'
                    className='block w-full rounded-md border-gray-300 focus:border-ferocia sm:text-sm'
                    placeholder='3'
                  />
                </div>
                <div className='col-span-1'>
                  <FormInput
                    label='And for how many months?'
                    min={0}
                    max={11}
                    error={hasErrors(errors.months)}
                    errorMessage={getFirstErrorMessage(errors.months)}
                    value={totalMonths}
                    onChange={(event) => setTotalMonths(event.target.value)}
                    type='number'
                    name='investmentTermMonths'
                    id='investmentTermMonths'
                    className='block w-full rounded-md border-gray-300 focus:border-ferocia sm:text-sm'
                    placeholder='0'
                  />
                </div>
              </div>
              <div className='pt-6'>
                <InterestButtons
                  onClick={(value) => setInterestPayoutMode(value)}
                  mode={interestPayoutMode}
                />
              </div>
            </div>
            <dl className='mt-5 grid grid-cols-1 gap-5 col-span-1 w-full'>
              <TotalInterestEarned
                stat={`$${interestEarned}`}
              />
              <FinalBalance
                stat={`$${total}`}
              />
            </dl>
          </div>
        </div>
    </div>
    </>
  )
}

export default Home
