import { forwardRef } from 'react'
import { HistoricalEventsGroup } from '../../../../model/types'
import { Point } from '../../shared/lib'
import { EventsCirclePoint } from './events-circle-point'
import cls from './events-groups-circle.module.scss'

type Props = {
  points: Point[]
  activeIndex: number
  handleGroupChange: (newIndex: number) => void
  eventsGroups: HistoricalEventsGroup[]
  isTransitioning: boolean
  disabled?: boolean
}

export const EventsGroupsCircle = forwardRef<HTMLDivElement, Props>(
  (
    {
      points,
      activeIndex,
      handleGroupChange,
      eventsGroups,
      isTransitioning,
      disabled,
    },
    ref
  ) => {
    return (
      <div className={cls.circle} ref={ref}>
        <div className={cls.points}>
          {points.map(({ x, y }, index) => (
            <EventsCirclePoint
              key={index}
              style={{ left: x, top: y }}
              isActive={index === activeIndex}
              onClick={() => handleGroupChange(index)}
              title={eventsGroups[index].title}
              isTitleShown={!isTransitioning}
              disabled={disabled}
            >
              {index + 1}
            </EventsCirclePoint>
          ))}
        </div>
      </div>
    )
  }
)
EventsGroupsCircle.displayName = 'EventsGroupsCircle'
