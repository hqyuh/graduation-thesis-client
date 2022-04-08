import { Language } from '../../context/Localization/localization.types'

export const VI: Language = {
  locale: 'vi',
  language: 'Tiếng Việt',
}

export const EN_US: Language = {
  locale: 'en-US',
  language: 'English',
}

const supportedLanguages: Language[] = [VI, EN_US]

export default supportedLanguages
