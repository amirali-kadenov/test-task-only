import { SwiperSlide } from 'swiper/react'
import cls from './events-slider-item.module.scss'

export const EventsSliderItem = ({
  year,
  description,
}: {
  year: string
  description: string
}) => {
  return (
    <SwiperSlide key={year} title={description} className={cls.slide}>
      <h3 className={cls.year}>{year}</h3>
      <p className={cls.description}>{description}</p>
    </SwiperSlide>
  )
}

EventsSliderItem.displayName = 'SwiperSlide'
