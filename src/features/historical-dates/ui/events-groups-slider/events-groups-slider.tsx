import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'
import { POINTS_ROTATE, ROTATE } from '../../lib/constants'
import { HistoricalEventsGroup } from '../../model/types'
import { NavigationButton } from '../navigation-button/navigation-button'
import { CirclePoint } from './circle-point'
import cls from './events-groups-slider.module.scss'
import { getPointsCoordinates } from './lib'

type Point = {
  x: number
  y: number
}

type Props = {
  initialActiveIndex: number
  eventsGroups: HistoricalEventsGroup[]
  beforeGroupChange: (newIndex: number) => void
  afterGroupChange: (newIndex: number) => void
}

const DURATION = 0.7

export const EventsGroupsSlider = ({
  initialActiveIndex,
  eventsGroups,
  beforeGroupChange,
  afterGroupChange,
}: Props) => {
  const circleRef = useRef<HTMLDivElement>(null)
  const startYearRef = useRef<HTMLDivElement>(null)
  const endYearRef = useRef<HTMLDivElement>(null)

  const [pointsCoordinates, setPointsCoordinates] = useState<Point[]>([])
  const [activeIndex, setLocalActiveIndex] = useState(initialActiveIndex)
  const [isTitleVisible, setIsTitleVisible] = useState(true)

  useLayoutEffect(() => {
    if (!circleRef.current) return

    const circleWidth = circleRef.current.offsetWidth
    const pointsCoordinates = getPointsCoordinates(
      eventsGroups.length,
      circleWidth
    )

    setPointsCoordinates(pointsCoordinates)
  }, [eventsGroups])

  const handleGroupChange = (newIndex: number) => {
    const newGroup = eventsGroups[newIndex]
    const newStartYear = Math.floor(Number(newGroup.events[0].year))
    const newEndYear = Math.floor(
      Number(newGroup.events[newGroup.events.length - 1].year)
    )

    const step = 360 / eventsGroups.length
    const prevOffset = activeIndex * step
    const offset = newIndex - activeIndex
    const rotate = prevOffset + offset * step

    gsap.to(startYearRef.current, {
      textContent: newStartYear,
      snap: { textContent: 1 },
      duration: DURATION,
    })

    gsap.to(endYearRef.current, {
      textContent: newEndYear,
      snap: { textContent: 1 },
      duration: DURATION,
    })

    gsap.to(circleRef.current, {
      [ROTATE]: `${rotate * -1}deg`,
      [POINTS_ROTATE]: `${rotate}deg`,
      ease: 'none',
      duration: DURATION,
      onStart: () => {
        setLocalActiveIndex(newIndex)
        beforeGroupChange(newIndex)
        setIsTitleVisible(false)
      },
      onComplete: () => {
        afterGroupChange(newIndex)
        setIsTitleVisible(true)
      },
    })
  }

  const activeGroup = eventsGroups[activeIndex]

  const startYear = activeGroup.events[0].year
  const endYear = activeGroup.events[activeGroup.events.length - 1].year
  const paginationText = `0${activeIndex + 1}/0${eventsGroups.length}`

  return (
    <>
      <div className={cls.container}>
        <div className={cls.wrapper}>
          <div className={cls.circle} ref={circleRef}>
            <div className={cls.points}>
              {pointsCoordinates.map(({ x, y }, index) => (
                <CirclePoint
                  key={index}
                  style={{ left: x, top: y }}
                  isActive={index === activeIndex}
                  onClick={() => handleGroupChange(index)}
                  title={eventsGroups[index].title}
                  isTitleVisible={isTitleVisible}
                >
                  {index + 1}
                </CirclePoint>
              ))}
            </div>
          </div>

          <h2 className={cls.dates}>
            <span className={cls.start} ref={startYearRef}>
              {startYear}
            </span>
            &nbsp;&nbsp;
            <span className={cls.end} ref={endYearRef}>
              {endYear}
            </span>
          </h2>
        </div>
      </div>

      <div className={cls.pagination}>
        <span className={cls.paginationText}>{paginationText}</span>

        <div className={cls.buttons}>
          <NavigationButton
            isPrev
            disabled={activeIndex === 0}
            onClick={() => handleGroupChange(activeIndex - 1)}
          />
          <NavigationButton
            isNext
            disabled={activeIndex === eventsGroups.length - 1}
            onClick={() => handleGroupChange(activeIndex + 1)}
          />
        </div>
      </div>
    </>
  )
}
