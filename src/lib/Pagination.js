export const cycleThrough = (max, min, currentValue, newValue) => {
  if (newValue < min) return currentValue
  if (newValue > max) return currentValue
  return newValue
}
