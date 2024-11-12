import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const localStorageTheme = localStorage.getItem('calendar-theme')
  const initialTheme = localStorageTheme != null ? localStorageTheme : 'system'
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const themeAttribute = document.querySelector('body')
    themeAttribute?.setAttribute('data-theme', theme)
    localStorage.setItem('calendar-theme', theme)
  }, [theme])

  return (
    <select
      id='theme-switch'
      title='Theme switch'
      value={theme}
      onChange={e => setTheme(e.target.value)}>
      <option value='system'>System</option>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
    </select>
  )
}
