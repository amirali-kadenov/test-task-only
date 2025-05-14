import { useRef } from 'react'
import { HistoricalEventsGroup } from '../../../model/types'
import { useEventsGroupsSlider } from '../shared/model'
import { EventsGroupsNavigation } from '../shared/navigation/events-groups-navigation'
import { EventsGroupsYears } from '../shared/years/events-groups-years'
import { EventsGroupsCircle } from './circle/events-groups-circle'
import cls from './events-groups-slider.module.scss'

export type EventsGroupsSliderProps = {
  initialActiveIndex: number
  eventsGroups: HistoricalEventsGroup[]
  beforeGroupChange: (newIndex: number) => void
  afterGroupChange: (newIndex: number) => void
}

export const EventsGroupsSlider = (props: EventsGroupsSliderProps) => {
  const { eventsGroups } = props

  const circleRef = useRef<HTMLDivElement>(null)
  const startYearRef = useRef<HTMLDivElement>(null)
  const endYearRef = useRef<HTMLDivElement>(null)

  const { pointsCoordinates, activeIndex, isTransitioning, handleGroupChange } =
    useEventsGroupsSlider(props, [circleRef, startYearRef, endYearRef])

  const activeGroup = eventsGroups[activeIndex]

  const startYear = activeGroup.events[0].year
  const endYear = activeGroup.events[activeGroup.events.length - 1].year

  return (
    <>
      <div className={cls.container}>
        <div className={cls.wrapper}>
          <EventsGroupsCircle
            circleRef={circleRef}
            pointsCoordinates={pointsCoordinates}
            activeIndex={activeIndex}
            handleGroupChange={handleGroupChange}
            eventsGroups={eventsGroups}
            isTransitioning={isTransitioning}
          />

          <EventsGroupsYears
            startYear={startYear}
            endYear={endYear}
            startYearRef={startYearRef}
            endYearRef={endYearRef}
          />
        </div>
      </div>

      <EventsGroupsNavigation
        isTransitioning={isTransitioning}
        handleGroupChange={handleGroupChange}
        activeIndex={activeIndex}
        eventsGroups={eventsGroups}
      />
    </>
  )
}
