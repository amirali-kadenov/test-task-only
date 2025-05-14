import { RefObject } from 'react'
import { HistoricalEventsGroup } from '../../../../model/types'
import { EventsCirclePoint } from './events-circle-point'
import cls from './events-groups-circle.module.scss'

type Props = {
  circleRef: RefObject<HTMLDivElement>
  pointsCoordinates: { x: number; y: number }[]
  activeIndex: number
  handleGroupChange: (newIndex: number) => void
  eventsGroups: HistoricalEventsGroup[]
  isTransitioning: boolean
}

export const EventsGroupsCircle = ({
  circleRef,
  pointsCoordinates,
  activeIndex,
  handleGroupChange,
  eventsGroups,
  isTransitioning,
}: Props) => {
  return (
    <div className={cls.circle} ref={circleRef}>
      <div className={cls.points}>
        {pointsCoordinates.map(({ x, y }, index) => (
          <EventsCirclePoint
            key={index}
            style={{ left: x, top: y }}
            isActive={index === activeIndex}
            onClick={() => handleGroupChange(index)}
            title={eventsGroups[index].title}
            $isTitleVisible={!isTransitioning}
          >
            {index + 1}
          </EventsCirclePoint>
        ))}
      </div>
    </div>
  )
}
