export const fetchLocale = async (locale: string): Promise<Record<string, any>> => {
  const response = await fetch(`/locales/${locale}.json`)
  return response.json()
}
