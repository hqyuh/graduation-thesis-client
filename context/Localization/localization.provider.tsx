import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Language, LanguageContextAPI, LanguageContextData, LanguageProviderState } from './localization.types'
import translations from '../../config/localization/translations.json'
import supportedLanguages, { VI } from '../../config/localization/languages'
import { fetchLocale } from '../../lib/locale'
import { getUserSettingsBy, updateUserSettings } from '../../config/user/userSetting'

const defaultState: LanguageProviderState = {
  isFetching: true,
  currentLanguage: VI,
}

const LanguageContext = createContext<LanguageContextAPI>({
  ...defaultState,
  t: (key) => key,
  changeLanguage: () => null,
})

const languageMap = new Map<Language['locale'], Record<string, any>>()
languageMap.set(VI.locale, translations)

const LanguageProvider: React.FC = ({ children }) => {
  const userSettingLanguage = getUserSettingsBy('language')

  const { locale } = useRouter()
  const [state, setState] = useState<LanguageProviderState>(() => {
    const currentLanguage = supportedLanguages.find((value) => value.locale === userSettingLanguage) || VI
    return { ...defaultState, currentLanguage }
  })

  useEffect(() => {
    const fetchInitialLocales = async () => {
      let userLocale = userSettingLanguage
      if (typeof userLocale === 'undefined') {
        userLocale = locale || VI.locale
        updateUserSettings('language', userLocale)
      }

      if (userLocale !== VI.locale) {
        const viTranslations = languageMap.get(VI.locale)
        const userLanguageTranslations = await fetchLocale(userLocale)
        languageMap.set(userLocale, { ...viTranslations, ...userLanguageTranslations })
      }
    }

    fetchInitialLocales().then(() => {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }))
    })
  }, [locale, userSettingLanguage])

  const { currentLanguage } = state

  const changeLanguage = async (language: Language) => {
    if (!languageMap.has(language.locale)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))
      const newLanguageTranslations = await fetchLocale(language.locale)

      languageMap.set(language.locale, newLanguageTranslations)
    }

    updateUserSettings('language', language.locale)
    setState((prevState) => ({
      ...prevState,
      isFetching: false,
      currentLanguage: language,
    }))
  }
  const parseTransKey = (text: string, data: any): string | Record<string, unknown> =>
    text.split('.').reduce((o, i) => o[i], data) || text

  const translate = useCallback(
    (key: string, data?: LanguageContextData) => {
      const translationSet = languageMap.has(currentLanguage.locale)
        ? languageMap.get(currentLanguage.locale)
        : languageMap.get(VI.locale)
      const translatedText = parseTransKey(key, translationSet)

      if (typeof translatedText === 'object') {
        return key
      }

      // Check the existence of at least one combination of %%, separated by 1 or more non space characters
      const includesVariable = translatedText.match(/{\S+?}/gm)
      if (includesVariable && data) {
        let interpolatedText = translatedText
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`{${dataKey}}`, 'g')
          interpolatedText = interpolatedText.replace(templateKey, (data[dataKey] || templateKey).toString())
        })

        return interpolatedText
      }

      return translatedText
    },
    [currentLanguage],
  )
  return (
    <LanguageContext.Provider value={{ ...state, changeLanguage, t: translate }}>{children}</LanguageContext.Provider>
  )
}

export const useTranslations = () => useContext(LanguageContext)

export default LanguageProvider
