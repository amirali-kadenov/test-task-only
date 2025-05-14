import clsx from 'clsx'
import gsap from 'gsap'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react'
import {
  SLIDE_FINAL_ANIMATION,
  SLIDE_STARTING_ANIMATION_IN,
  SWIPER_SLIDE_CLASS_NAME,
} from '../../lib/constants'
import { HistoricalEventsGroup } from '../../model/types'
import { NavigationButton } from '../navigation-button/navigation-button'
import cls from './events-slider.module.scss'

type Props = {
  eventsGroup: HistoricalEventsGroup
  containerRef: RefObject<SwiperRef>
}

export const EventsSlider = ({ eventsGroup, containerRef }: Props) => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        SWIPER_SLIDE_CLASS_NAME,
        SLIDE_STARTING_ANIMATION_IN,
        SLIDE_FINAL_ANIMATION
      )
    }, containerRef)

    return () => ctx.clear()
  }, [eventsGroup])

  return (
    <div className={cls.wrapper}>
      <Swiper
        ref={containerRef}
        className={cls.slider}
        modules={[Navigation]}
        spaceBetween={80}
        slidesPerView={3}
        grabCursor
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
          <SwiperSlide key={year} title={description}>
            <h3 className={cls.year}>{year}</h3>
            <p className={cls.description}>{description}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={cls.pagination}>
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
