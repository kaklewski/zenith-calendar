export type ThemeSwitchType = {
  theme: string
  setTheme: (value: string) => void
}

export default function ThemeSwitch({ theme, setTheme }: ThemeSwitchType) {
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
