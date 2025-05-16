import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { RefObject } from 'react'
import { SwiperRef } from 'swiper/react'
import {
  SLIDE_FINAL_ANIMATION,
  SLIDE_STARTING_ANIMATION_IN,
  SLIDE_CLASS_NAME,
} from '../../lib/constants'
import { HistoricalEventsGroup } from '../../model/types'

type Props = {
  containerRef: RefObject<SwiperRef>
  eventsGroup: HistoricalEventsGroup
}

export const useEventsSliderAnimation = ({
  containerRef,
  eventsGroup,
}: Props) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        SLIDE_CLASS_NAME,
        SLIDE_STARTING_ANIMATION_IN,
        SLIDE_FINAL_ANIMATION
      )
    }, containerRef)

    return () => ctx.clear()
  }, [eventsGroup])
}
