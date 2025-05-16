export type Point = {
  x: number
  y: number
}

/**
 * Calculates coordinates for evenly spaced points around a circle.
 *
 * @param pointsCount - Total number of points to place around the circle.
 * @param circleWidth - The width and height of the circle (assumes a perfect circle in a square space).
 * @returns Array of coordinate objects { x, y } for each point.
 */
export const getPoints = (pointsCount: number, circleWidth: number) => {
  const radius = circleWidth / 2 // Radius of the circle
  const center = circleWidth / 2 // Center point (x and y) of the circle
  const angleOffset = -(Math.PI / pointsCount) // Optional small rotation clockwise for visual balance

  const points: Point[] = []

  for (let i = 0; i < pointsCount; i++) {
    const baseAngle = Math.PI / 2 // Starting angle (top of the circle)
    const pointAngle = ((2 * Math.PI) / pointsCount) * i // Angle for this point
    const angle = baseAngle - pointAngle + angleOffset // Final angle with offset

    const x = center + radius * Math.cos(angle)
    const y = center - radius * Math.sin(angle) // Inverted Y because screen coordinates grow downward

    points.push({ x, y }) // Store point
  }

  return points
}

export const resolveYear = (year: string) => Math.floor(Number(year))
