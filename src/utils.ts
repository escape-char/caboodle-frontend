export function uniqueId(): string {
  return '_' + Math.random().toString(36).substr(2, 16)
}

export function dashToUpperCamelCase(str: string): string {
  return str.split('-').reduce((acc: string, v: string) => {
    const capitalized = v.charAt(0).toUpperCase() + v.slice(1)
    return acc + capitalized
  }, '')
}

export function classNames(
  names:
    | Array<string | null | undefined>
    | string
    | Record<string, unknown>
    | null
    | undefined,
  objClass?: Record<string, unknown>
): string {
  const filterObject = (
    object: Record<string, unknown> | undefined
  ): string => {
    if (!object) {
      return ''
    }
    const objKeys: Array<string> = Object.keys(object)

    return objKeys.reduce((acc, k) => {
      const v = object[k]
      if (!v || !k) {
        return acc
      }
      acc = acc + ' ' + k
      return acc
    }, '')
  }

  if (typeof names === 'object' && !Array.isArray(names)) {
    return filterObject(names as Record<string, unknown>)
  }

  const lClasses: Array<string | null | undefined> = !names
    ? []
    : typeof names === 'string'
    ? [names]
    : names

  const filteredNames: string = lClasses.filter((v) => !!v).join(' ')
  const filteredObj: string = filterObject(objClass)
  return filteredNames + filteredObj
}

export function pick(
  obj: Record<string, unknown>,
  keys: Array<string>
): Record<string, unknown> {
  return keys.reduce((acc: Record<string, unknown>, k: string) => {
    if (obj[k] !== undefined) {
      acc[k] = obj[k]
    }
    return acc
  }, {})
}

export function range(start = 0, end: number, increment = 1): Array<any> {
  const isEndDef = typeof end !== 'undefined'
  const newEnd = isEndDef ? end : start
  const newStart = isEndDef ? start : 0
  const newInc =
    typeof increment === 'undefined' ? Math.sign(newEnd - newStart) : increment
  const length = Math.abs((newEnd - newStart) / (newInc || 1))

  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      // append the current value to the result array
      result: [...result, current],
      // adding the increment to the current item
      // to be used in the next iteration
      current: current + newInc
    }),
    { current: newStart, result: [] }
  )

  return result
}

export function debounce(
  func: (...parameters: any[]) => any,
  delay: number,
  leading = false
): (...args: any[]) => void {
  let timerId: ReturnType<typeof setTimeout>

  return (...args: any[]): void => {
    if (!timerId && leading) {
      func(...args)
    }
    clearTimeout(timerId)
    timerId = setTimeout(() => func(...args), delay)
  }
}
