import { ReactNode, useRef } from 'react'
import { EventsGroupsSliderProps } from '../desktop/events-groups-slider'
import { useEventsGroupsSlider } from '../shared/model'
import { EventsGroupsNavigation } from '../shared/navigation/events-groups-navigation'
import { EventsGroupsYears } from '../shared/years/events-groups-years'
import cls from './events-groups-slider-mobile.module.scss'
import { EventsGroupsPagination } from './pagination/events-groups-pagination'

type Props = EventsGroupsSliderProps & {
  children: ReactNode
}

export const EventsGroupsSliderMobile = (props: Props) => {
  const { eventsGroups, children } = props

  const startYearRef = useRef<HTMLDivElement>(null)
  const endYearRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  const {
    activeIndex,
    isTransitioning,
    handleGroupChange,
    activeGroup,
    startYear,
    endYear,
  } = useEventsGroupsSlider(props, [circleRef, startYearRef, endYearRef])

  return (
    <div className={cls.container}>
      <EventsGroupsYears
        startYear={startYear}
        endYear={endYear}
        startYearRef={startYearRef}
        endYearRef={endYearRef}
        className={cls.years}
      />

      <h3 className={cls.title}>{activeGroup.title}</h3>

      {children}

      <div className={cls.footer}>
        <EventsGroupsNavigation
          isTransitioning={isTransitioning}
          handleGroupChange={handleGroupChange}
          activeIndex={activeIndex}
          eventsGroups={eventsGroups}
        />

        <EventsGroupsPagination
          currentPage={activeIndex}
          totalPages={eventsGroups.length}
          onPageChange={handleGroupChange}
          disabled={isTransitioning}
        />
      </div>
    </div>
  )
}
