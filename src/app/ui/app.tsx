import { HistoricalEvents } from '@/features/historical-dates'
import { EVENTS_GROUPS } from '../model/data'
import '../styles/index.scss'
import styles from './app.module.scss'

export const App = () => {
  return (
    <main className={styles.app}>
      <HistoricalEvents eventsGroups={EVENTS_GROUPS} />
    </main>
  )
}
