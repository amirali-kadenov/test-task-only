import { rem } from '@/shared/utils/rem'
import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { POINTS_ROTATE } from '../../lib/constants'

type Props = {
  isActive?: boolean
  children: ReactNode
  style?: CSSProperties
  onClick?: () => void
  title: string
  isTitleVisible: boolean | undefined
}

export const CirclePoint = ({
  isActive,
  children,
  style,
  onClick,
  title,
  isTitleVisible,
}: Props) => {
  return (
    <Root
      style={style}
      onClick={onClick}
      className={clsx(isActive && 'active')}
    >
      <Container isTitleVisible={isTitleVisible}>
        <RippleWrapper>
          {children}
          <Ripple />
        </RippleWrapper>
      </Container>

      <PointTitle>{title}</PointTitle>
    </Root>
  )
}

type RootProps = Omit<Props, 'title' | 'isTitleVisible'>
type TitleVisibleProp = Pick<Props, 'isTitleVisible'>

const Root = styled.div<RootProps>`
  width: ${rem(56)};
  height: ${rem(56)};
  position: absolute;
  transform: translate(-50%, -50%) rotate(var(${POINTS_ROTATE}, 0));
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  --size: ${rem(6)};
  --ripple-bg: var(--black-blue);

  &:hover,
  &.active {
    --size: ${rem(56)};
    --ripple-bg: var(--gray-100);
  }
`

const PointTitle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(50%);
  margin-left: 90px;
  font-size: ${rem(20)};
  line-height: ${rem(30)};
  font-weight: 700;
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms;
`

const Container = styled.div<TitleVisibleProp>`
  border-radius: 999px;
  overflow: hidden;

  ${(props) => {
    if (!props.isTitleVisible) return

    return css`
      .active & ~ ${PointTitle} {
        opacity: 1;
        pointer-events: auto;
      }
    `
  }}
`

const RippleWrapper = styled.div`
  position: relative;
  width: var(--size);
  height: var(--size);
  transition: all 0.5s;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  font-size: ${rem(20)};
  line-height: ${rem(30)};
`

const Ripple = styled.div`
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background-color: var(--ripple-bg);
  transition: background-color 0.5s;
  border: 1px solid var(--black-blue-50);
  z-index: -1;
`
