import clsx from 'clsx'
import { RefObject } from 'react'
import cls from './events-groups-years.module.scss'

type Props = {
  startYear: string
  startYearRef: RefObject<HTMLDivElement>
  endYear: string
  endYearRef: RefObject<HTMLDivElement>
  className?: string
}

export const EventsGroupsYears = ({
  startYear,
  endYear,
  startYearRef,
  endYearRef,
  className,
}: Props) => {
  return (
    <h2 className={clsx(cls.years, className)}>
      <span className={cls.start} ref={startYearRef}>
        {startYear}
      </span>
      &nbsp;&nbsp;
      <span className={cls.end} ref={endYearRef}>
        {endYear}
      </span>
    </h2>
  )
}
