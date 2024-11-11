import { useMemo, useState } from 'react'
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameDay,
} from 'date-fns'
import { formatDate } from '../utils/formatDate'
import { useEvents } from '../context/useEvents'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import CalendarDay from './CalendarDay'
import ThemeSwitch from './ThemeSwitch'

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth), {
      weekStartsOn: 1,
    })
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth), {
      weekStartsOn: 1,
    })
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  }, [selectedMonth])

  const { events } = useEvents()

  return (
    <div className='calendar'>
      <div className='header'>
        <button
          type='button'
          className='btn'
          onClick={() => setSelectedMonth(new Date())}>
          Today
        </button>
        <div>
          <button
            type='button'
            title='Previous Month'
            className='month-change-btn'
            onClick={() => setSelectedMonth(m => subMonths(m, 1))}>
            <IconChevronLeft />
          </button>
          <button
            type='button'
            title='Next Month'
            className='month-change-btn'
            onClick={() => setSelectedMonth(m => addMonths(m, 1))}>
            <IconChevronRight />
          </button>
        </div>
        <span className='month-title'>
          {formatDate(selectedMonth, {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <ThemeSwitch />
      </div>
      <div className='days-of-week'>
        {calendarDays.map((day, index) => {
          if (index < 7)
            return (
              <div key={index} className='day-of-week'>
                <div className='week-name'>
                  {formatDate(day, { weekday: 'short' })}
                </div>
              </div>
            )
        })}
      </div>
      <div className='days-of-month'>
        {calendarDays.map(day => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            events={events.filter(event => isSameDay(day, event.date))}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  )
}
