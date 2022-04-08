import { ReactText } from 'react'

export interface Language {
  locale: string
  language: string
}

export type LanguageContextData = {
  [key: string]: ReactText | undefined
}

export interface LanguageProviderState {
  isFetching: boolean
  currentLanguage: Language
}

export interface LanguageContextAPI extends LanguageProviderState {
  changeLanguage: (language: Language) => void
  t: (key: string, data?: LanguageContextData) => string | undefined
}
