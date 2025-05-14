import { gsap } from 'gsap'
import { RefObject, useLayoutEffect, useState } from 'react'
import { POINTS_ROTATE, ROTATE } from '../../../lib/constants'
import { EventsGroupsSliderProps } from '../desktop/events-groups-slider'
import { getPointsCoordinates, resolveYear } from './lib'

type Point = {
  x: number
  y: number
}

const DURATION = 0.7

export const useEventsGroupsSlider = (
  props: EventsGroupsSliderProps,
  refs: RefObject<HTMLDivElement>[]
) => {
  const {
    initialActiveIndex,
    eventsGroups,
    beforeGroupChange,
    afterGroupChange,
  } = props

  const [circleRef, startYearRef, endYearRef] = refs

  const [pointsCoordinates, setPointsCoordinates] = useState<Point[]>([])
  const [activeIndex, setLocalActiveIndex] = useState(initialActiveIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
    const newStartYear = resolveYear(newGroup.events[0].year)
    const newEndYear = resolveYear(
      newGroup.events[newGroup.events.length - 1].year
    )

    gsap.to(startYearRef.current, {
      textContent: newStartYear,
      snap: { textContent: 1 },
      duration: DURATION,
    })

    gsap.to(endYearRef.current, {
      textContent: newEndYear,
      snap: { textContent: 1 },
      duration: DURATION,
      onStart: () => {
        setLocalActiveIndex(newIndex)
        beforeGroupChange(newIndex)
        setIsTransitioning(true)
      },
      onComplete: () => {
        afterGroupChange(newIndex)
        setIsTransitioning(false)
      },
    })

    if (!circleRef.current) return

    const step = 360 / eventsGroups.length
    const prevOffset = activeIndex * step
    const offset = newIndex - activeIndex
    const rotate = prevOffset + offset * step

    gsap.to(circleRef.current, {
      [ROTATE]: `${rotate * -1}deg`,
      [POINTS_ROTATE]: `${rotate}deg`,
      ease: 'none',
      duration: DURATION,
    })
  }

  const activeGroup = eventsGroups[activeIndex]
  const startYear = activeGroup.events[0].year
  const endYear = activeGroup.events[activeGroup.events.length - 1].year

  return {
    pointsCoordinates,
    activeIndex,
    isTransitioning,
    handleGroupChange,
    activeGroup,
    startYear,
    endYear,
  }
}
