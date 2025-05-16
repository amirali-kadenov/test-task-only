import { FreeMode } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import { EventsSliderProps } from '../desktop/events-slider'
import { EventsSliderItem } from '../item/events-slider-item'
import { useEventsSliderAnimation } from '../lib'

type Props = EventsSliderProps

export const EventsSliderMobile = (props: Props) => {
  const { eventsGroup, containerRef } = props

  useEventsSliderAnimation(props)

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode
      ref={containerRef}
      slidesPerView="auto"
      spaceBetween={25}
      grabCursor
    >
      {eventsGroup.events.map(({ year, description }) => (
        <EventsSliderItem key={year} year={year} description={description} />
      ))}
    </Swiper>
  )
}
