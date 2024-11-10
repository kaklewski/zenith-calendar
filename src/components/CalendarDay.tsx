import { useMemo, useState } from 'react'
import { useEvents } from '../context/useEvents'
import { cc } from '../utils/cc'
import { endOfDay, isBefore, isSameMonth, isToday } from 'date-fns'
import { formatDate } from '../utils/formatDate'
import OverflowContainer from './OverflowContainer'
import ViewMoreCalendarEventsModal from './ViewMoreCalendarEventsModal'
import EventFormModal from './EventFormModal'
import { Event } from '../context/Events'
import CalendarEvent from './CalendarEvent'

type CalendarDayProps = {
  day: Date
  selectedMonth: Date
  events: Event[]
}

export default function CalendarDay({
  day,
  selectedMonth,
  events,
}: CalendarDayProps) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [isViewMoreEventModalOpen, setIsViewMoreEventModalOpen] =
    useState(false)
  const { addEvent } = useEvents()

  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => parseFloat(time.replace(':', '.'))

    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0
      } else if (a.allDay) {
        return -1
      } else if (b.allDay) {
        return 1
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime)
      }
    })
  }, [events])

  return (
    <div
      className={cc(
        'day',
        !isSameMonth(day, selectedMonth) && 'non-month-day',
        isBefore(endOfDay(day), new Date()) && 'old-month-day'
      )}>
      <div className='day-header'>
        <div className={cc('day-number', isToday(day) && 'today')}>
          {formatDate(day, { day: 'numeric' })}
        </div>
        <button
          type='button'
          className='add-event-btn'
          title='Add Event'
          onClick={() => setIsNewEventModalOpen(true)}>
          +
        </button>
      </div>

      {sortedEvents.length > 0 && (
        <OverflowContainer
          className='events'
          items={sortedEvents}
          getKey={event => event.id}
          renderItem={event => <CalendarEvent event={event} />}
          renderOverflow={amount => (
            <>
              <button
                type='button'
                title='See all events'
                onClick={() => setIsViewMoreEventModalOpen(true)}
                className='events-view-more-btn'>
                +{amount}
              </button>
              <ViewMoreCalendarEventsModal
                events={sortedEvents}
                isOpen={isViewMoreEventModalOpen}
                onClose={() => setIsViewMoreEventModalOpen(false)}
              />
            </>
          )}
        />
      )}

      <EventFormModal
        date={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={addEvent}
      />
    </div>
  )
}
