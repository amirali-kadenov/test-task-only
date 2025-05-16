import clsx from 'clsx'
import { RefObject, useRef, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperRef } from 'swiper/react'

import { HistoricalEventsGroup } from '../../../model/types'
import { NavigationButton } from '../../navigation-button/navigation-button'
import { EventsSliderItem } from '../item/events-slider-item'
import { useEventsSliderAnimation } from '../lib'
import cls from './events-slider.module.scss'

export type EventsSliderProps = {
  eventsGroup: HistoricalEventsGroup
  containerRef: RefObject<SwiperRef>
}

export const EventsSlider = ({
  eventsGroup,
  containerRef,
}: EventsSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEventsSliderAnimation({
    containerRef,
    eventsGroup,
  })

  return (
    <div className={cls.wrapper}>
      <Swiper
        ref={containerRef}
        className={cls.slider}
        modules={[Navigation]}
        grabCursor
        spaceBetween={40}
        slidesPerView={'auto'}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1600: {
            spaceBetween: 80,
            slidesPerView: 'auto',
          },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.navigation.nextEl = nextRef.current
          swiper.navigation.prevEl = prevRef.current
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setAtStart(swiper.isBeginning)
          setAtEnd(swiper.isEnd)
        }}
      >
        {eventsGroup.events.map(({ year, description }) => (
          <EventsSliderItem key={year} year={year} description={description} />
        ))}
      </Swiper>

      <div className={cls.navigation}>
        <div className={clsx(cls.buttonWrapper, atStart && cls.hidden)}>
          <NavigationButton
            ref={prevRef}
            isPrev
            $withoutBorder
            size={40}
            className={cls.button}
            onClick={() => swiperRef.current?.slidePrev()}
          />
        </div>

        <div className={clsx(cls.buttonWrapper, atEnd && cls.hidden)}>
          <NavigationButton
            ref={nextRef}
            isNext
            $withoutBorder
            size={40}
            className={cls.button}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </div>
  )
}
