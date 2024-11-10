import { IconX } from '@tabler/icons-react'
import { formatDate } from '../utils/formatDate'
import { Modal, ModalProps } from './Modal'
import CalendarEvent from './CalendarEvent'

import { Event } from '../context/Events'

type ViewMoreCalendarEventsModalProps = {
  events: Event[]
} & Omit<ModalProps, 'children'>

export default function ViewMoreCalendarEventsModal({
  events,
  ...modalProps
}: ViewMoreCalendarEventsModalProps) {
  if (events.length === 0) return null
  return (
    <Modal {...modalProps}>
      <div className='modal-title'>
        <small>{formatDate(events[0].date, { dateStyle: 'short' })}</small>
        <button
          type='button'
          title='Close'
          className='close-btn'
          onClick={modalProps.onClose}>
          <IconX />
        </button>
      </div>
      <div className='events'>
        {events.map(event => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </Modal>
  )
}
