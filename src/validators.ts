type ValidationResult = string | undefined

export function required(
  value: string | number,
  msg = 'this field is required'
): ValidationResult {
  return value ? msg : undefined
}
export function minLength(
  value: string,
  len: number,
  message = ''
): ValidationResult {
  const defaultMsg = message || `value must be greater than ${len} characters`
  return value.length < len ? defaultMsg : undefined
}

export function maxLength(
  value: string,
  len: number,
  message = ''
): ValidationResult {
  const defaultMsg = message || `value must be less than ${len} characters`
  return value.length > len ? defaultMsg : undefined
}

export function min(
  value: string,
  minNum: number,
  message = ''
): ValidationResult {
  const number = Number(value)
  const defaultMsg = message || `value must be less than ${minNum}`
  return number < minNum ? defaultMsg : undefined
}

export function max(
  value: string,
  maxNum: number,
  message = ''
): ValidationResult {
  const number = Number(value)
  const defaultMsg = message || `value must be less than ${maxNum}`
  return number < maxNum ? defaultMsg : undefined
}
