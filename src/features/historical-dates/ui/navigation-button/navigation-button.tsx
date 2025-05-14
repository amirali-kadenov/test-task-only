import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import styled, { css } from 'styled-components'
import cls from './navigation-button.module.scss'

type Props = ComponentPropsWithoutRef<'button'> & {
  isPrev?: boolean
  isNext?: boolean
  size?: number
  $withoutBorder?: boolean
}

export const NavigationButton = forwardRef<HTMLButtonElement, Props>(
  ({ size, isPrev, isNext, ...props }, ref) => {
    return (
      <NavigationButtonStyles size={size} ref={ref} {...props}>
        {isPrev && <ArrowLeftIcon />}
        {isNext && <ArrowLeftIcon className={cls.rotate180} />}
      </NavigationButtonStyles>
    )
  }
)

NavigationButton.displayName = 'NavigationButton'

type StylesProps = Pick<Props, 'size' | '$withoutBorder'>

const NavigationButtonStyles = styled.button<StylesProps>`
  border-radius: 999px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--black-blue);
  transition: background-color 200ms;

  &:hover {
    background-color: var(--white);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    color: var(--black-blue);
    background-color: transparent;
  }

  ${(props) => {
    const resolvedSize = props.size ?? 50
    return css`
      min-width: ${resolvedSize}px;
      height: ${resolvedSize}px;
      border: ${props.$withoutBorder
        ? 'none'
        : `1px solid var(--black-blue-50)`};
    `
  }}
`
