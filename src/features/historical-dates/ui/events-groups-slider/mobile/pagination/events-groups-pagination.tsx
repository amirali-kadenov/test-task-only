import clsx from 'clsx'
import cls from './events-groups-pagination.module.scss'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export const EventsGroupsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: Props) => {
  const pageNumbers = []

  for (let i = 0; i < totalPages; i++) pageNumbers.push(i)

  return (
    <div className={cls.pagination}>
      {pageNumbers.map((num) => (
        <button
          disabled={disabled}
          key={num}
          className={clsx(cls.button, currentPage === num && cls.active)}
          onClick={() => onPageChange(num)}
        />
      ))}
    </div>
  )
}
