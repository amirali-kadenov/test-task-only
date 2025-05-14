export const getPointsCoordinates = (
  pointsCount: number,
  circleWidth: number
) => {
  const radius = circleWidth / 2
  const centerX = circleWidth / 2
  const centerY = circleWidth / 2

  const angleOffset = -(Math.PI / pointsCount) // Смещение вправо
  const result = []

  for (let i = 0; i < pointsCount; i++) {
    // Учитываем смещение угла для сдвига первой точки
    const angle = Math.PI / 2 - ((2 * Math.PI) / pointsCount) * i + angleOffset
    const x = centerX + radius * Math.cos(angle)
    const y = centerY - radius * Math.sin(angle) // инверсия Y оси для HTML координат

    result.push({ x, y })
  }

  return result
}
