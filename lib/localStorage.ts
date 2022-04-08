export function loadFromLocalStorage(valueName: string) {
  try {
    const serializedValue = localStorage.getItem(`${valueName}`)
    if (serializedValue === null || serializedValue === undefined || serializedValue === 'undefined') {
      return undefined
    }

    return JSON.parse(serializedValue)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export function removeFromLocalStorage(valueName: string) {
  try {
    localStorage.removeItem(`${valueName}`)
  } catch (err) {
    console.error(err)
  }
}

export function saveToLocalStorage(valueName: string, value: any) {
  try {
    const serializedState = JSON.stringify(value)
    localStorage.setItem(`${valueName}`, serializedState)
  } catch (err) {
    console.error(err)
  }
}
