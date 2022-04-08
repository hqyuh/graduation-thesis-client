import LS_USER_SETTINGS from '../../constants'
import { loadFromLocalStorage, saveToLocalStorage } from '../../lib/localStorage'

export interface UserSettings {
  isDark: boolean
  language?: string
}

export const defaultUserSettings: UserSettings = { isDark: false }

export const getUserSettings = (): UserSettings => {
  if (typeof window !== 'undefined') {
    let settings = loadFromLocalStorage(LS_USER_SETTINGS)
    if (typeof settings === 'undefined') {
      settings = defaultUserSettings
    }
    return settings
  }

  return defaultUserSettings
}

export const getUserSettingsBy = <T extends keyof UserSettings>(key: T): UserSettings[T] => {
  const settings = getUserSettings()

  return settings[key]
}

export const updateUserSettings = <T extends keyof UserSettings>(key: T, value: UserSettings[T]) => {
  const settings: UserSettings = getUserSettings()
  const newSettings: UserSettings = { ...settings, [key]: value }
  if (typeof window !== 'undefined') {
    saveToLocalStorage(LS_USER_SETTINGS, newSettings)
  }
}

export const resetUserSettingsToDefault = () => {
  if (typeof window !== 'undefined') {
    saveToLocalStorage(LS_USER_SETTINGS, defaultUserSettings)
  }
}
