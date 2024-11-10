import { useState } from 'react'
import { useEvents } from '../context/useEvents'
import { formatDate } from '../utils/formatDate'
import { cc } from '../utils/cc'
import EventFormModal from './EventFormModal'
import { parse } from 'date-fns'
import { Event } from '../context/Events'

export default function CalendarEvent({ event }: { event: Event }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { updateEvent, deleteEvent } = useEvents()

  return (
    <>
      <button
        type='button'
        title={`Event: ${event.name}`}
        onClick={() => setIsEditModalOpen(true)}
        className={cc('event', event.color, event.allDay && 'all-day-event')}>
        {event.allDay ? (
          <div className='event-name'>{event.name}</div>
        ) : (
          <>
            <div className={`color-dot ${event.color}`}></div>
            <div className='event-time'>
              {formatDate(parse(event.startTime, 'HH:mm', event.date), {
                timeStyle: 'short',
              })}
            </div>
            <div className='event-name'>{event.name}</div>
          </>
        )}
      </button>

      <EventFormModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={e => updateEvent(event.id, e)}
        onDelete={() => deleteEvent(event.id)}
      />
    </>
  )
}
