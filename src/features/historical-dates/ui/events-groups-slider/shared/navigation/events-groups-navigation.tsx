import { HistoricalEventsGroup } from '../../../../model/types'
import { NavigationButton } from '../../../navigation-button/navigation-button'
import cls from './events-groups-navigation.module.scss'

type Props = {
  isTransitioning: boolean
  handleGroupChange: (index: number) => void
  activeIndex: number
  eventsGroups: HistoricalEventsGroup[]
}

export const EventsGroupsNavigation = ({
  isTransitioning,
  handleGroupChange,
  activeIndex,
  eventsGroups,
}: Props) => {
  const navigationText = `0${activeIndex + 1}/0${eventsGroups.length}`
  const isFirst = activeIndex === 0
  const isLast = activeIndex === eventsGroups.length - 1

  return (
    <div className={cls.navigation}>
      <span className={cls.navigationText}>{navigationText}</span>

      <div className={cls.buttons}>
        <NavigationButton
          isPrev
          disabled={isTransitioning || isFirst}
          onClick={() => handleGroupChange(activeIndex - 1)}
        />
        <NavigationButton
          isNext
          disabled={isTransitioning || isLast}
          onClick={() => handleGroupChange(activeIndex + 1)}
        />
      </div>
    </div>
  )
}
