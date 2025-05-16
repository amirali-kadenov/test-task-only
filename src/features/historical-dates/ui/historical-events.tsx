import { useIsMobile } from '@/shared/hooks/use-is-mobile'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { SwiperRef } from 'swiper/react'
import {
  SLIDE_FINAL_ANIMATION,
  SLIDE_STARTING_ANIMATION_OUT,
  SLIDE_CLASS_NAME,
} from '../lib/constants'
import { HistoricalEventsGroup } from '../model/types'
import { EventsGroupsSlider } from './events-groups-slider/desktop/events-groups-slider'
import { EventsGroupsSliderMobile } from './events-groups-slider/mobile/events-groups-slider-mobile'
import { EventsSlider } from './events-slider/desktop/events-slider'
import { EventsSliderMobile } from './events-slider/mobile/events-slider-mobile'
import cls from './historical-events.module.scss'

type Props = {
  eventsGroups: HistoricalEventsGroup[]
}

export const HistoricalEvents = ({ eventsGroups }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const eventsSliderRef = useRef<SwiperRef>(null)

  const isMobile = useIsMobile()

  const animateEventsSliderOut = () => {
    gsap.context(() => {
      gsap.fromTo(
        SLIDE_CLASS_NAME,
        SLIDE_FINAL_ANIMATION,
        SLIDE_STARTING_ANIMATION_OUT
      )
    }, eventsSliderRef.current)
  }

  const setNewActiveIndex = (newIndex: number) => {
    setActiveIndex(newIndex)
  }

  const activeGroup = eventsGroups[activeIndex]

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>
        Исторические <br /> даты
      </h1>

      {isMobile && (
        <EventsGroupsSliderMobile
          initialActiveIndex={activeIndex}
          eventsGroups={eventsGroups}
          beforeGroupChange={animateEventsSliderOut}
          afterGroupChange={setNewActiveIndex}
        >
          <EventsSliderMobile
            eventsGroup={activeGroup}
            containerRef={eventsSliderRef}
          />
        </EventsGroupsSliderMobile>
      )}

      {!isMobile && (
        <>
          <EventsGroupsSlider
            initialActiveIndex={activeIndex}
            eventsGroups={eventsGroups}
            beforeGroupChange={animateEventsSliderOut}
            afterGroupChange={setNewActiveIndex}
          />
          <EventsSlider
            eventsGroup={activeGroup}
            containerRef={eventsSliderRef}
          />
        </>
      )}
    </div>
  )
}
