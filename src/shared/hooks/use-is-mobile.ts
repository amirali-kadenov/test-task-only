import { useMediaQuery } from 'react-responsive'

export const useIsMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 })

  return isMobile
}
