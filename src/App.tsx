import { Calendar } from './components/Calendar'
import { EventsProvider } from './context/Events'
import './styles.scss'

export default function App() {
  return (
    <EventsProvider>
      <Calendar />
    </EventsProvider>
  )
}
