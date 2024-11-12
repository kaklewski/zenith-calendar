export type FirstDaySwitchType = {
  firstDayOfWeek: number
  setFirstDayOfWeek: (value: number) => void
}

export function FirstDaySwitch({
  firstDayOfWeek,
  setFirstDayOfWeek,
}: FirstDaySwitchType) {
  return (
    <select
      id='first-day-switch'
      title='First day of the week switch'
      value={firstDayOfWeek}
      onChange={e => setFirstDayOfWeek(parseInt(e.target.value))}>
      <option value='1'>Monday</option>
      <option value='6'>Saturday</option>
      <option value='0'>Sunday</option>
    </select>
  )
}
