import React, { useEffect, useRef } from 'react'
import { dashToUpperCamelCase } from '../../utils'

export enum IconSize {
  Tiny = 8,
  Small = 14,
  Medium = 16,
  Large = 24,
  Huge = 32,
  Massive = 42
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  size?: IconSize
}

const defaultProps = { size: IconSize.Small }

const Icon: React.FC<IconProps> = (props: IconProps): JSX.Element | null => {
  const { name, size } = props
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>()
  const [loading, setLoading] = React.useState(false)

  useEffect((): void => {
    setLoading(true)
    const importIcon = async (): Promise<void> => {
      try {
        const compName: string = dashToUpperCamelCase(name)
        ImportedIconRef.current = (await import(`./comp/${compName}`)).default
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name])

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef
    return <ImportedIcon width={size} height={size} className="icon" />
  }

  return null
}

Icon.defaultProps = defaultProps
export default Icon
