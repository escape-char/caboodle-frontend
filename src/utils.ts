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
