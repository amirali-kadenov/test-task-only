/**
 * Converts a pixel value to viewport width (vw).
 *
 * @param px - The pixel value to convert.
 * @param baseWidth - The base design width (default is 1920px).
 * @returns A string representing the value in vw units.
 */
export const pxToDvw = (px: number, baseWidth = 1920) => {
  const vw = (px / baseWidth) * 100
  return `${vw.toFixed(2)}vw`
}
