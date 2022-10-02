import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document (props: Record<string, unknown>) {
  return (
    <Html
      className="h-full relative scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
      lang='en'
    >
      <Head />
      <body className='flex h-full flex-col'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
