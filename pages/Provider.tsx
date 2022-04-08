import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import LanguageContext from '../context/Localization/index'

const Provider: React.FC = ({ children }) => (
  <>
    <LanguageContext>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow />
      {children}
    </LanguageContext>
  </>
)

export default Provider
