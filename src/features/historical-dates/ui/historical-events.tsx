import gsap from 'gsap'
import { useRef, useState } from 'react'
import { SwiperRef } from 'swiper/react'
import {
  SLIDE_FINAL_ANIMATION,
  SLIDE_STARTING_ANIMATION_OUT,
  SWIPER_SLIDE_CLASS_NAME,
} from '../lib/constants'
import { HistoricalEventsGroup } from '../model/types'
import { EventsGroupsSlider } from './events-groups-slider/events-groups-slider'
import { EventsSlider } from './events-slider/events-slider'
import cls from './historical-events.module.scss'

type Props = {
  eventGroups: HistoricalEventsGroup[]
}

export const HistoricalEvents = ({ eventGroups }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const eventsSliderRef = useRef<SwiperRef>(null)

  const animateEventsSliderOut = () => {
    gsap.context(() => {
      gsap.fromTo(
        SWIPER_SLIDE_CLASS_NAME,
        SLIDE_FINAL_ANIMATION,
        SLIDE_STARTING_ANIMATION_OUT
      )
    }, eventsSliderRef.current)
  }

  const setNewActiveIndex = (newIndex: number) => {
    setActiveIndex(newIndex)
  }

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>
        Исторические <br /> даты
      </h1>

      <EventsGroupsSlider
        initialActiveIndex={activeIndex}
        eventsGroups={eventGroups}
        beforeGroupChange={animateEventsSliderOut}
        afterGroupChange={setNewActiveIndex}
      />

      <EventsSlider
        eventsGroup={eventGroups[activeIndex]}
        containerRef={eventsSliderRef}
      />
    </div>
  )
}
