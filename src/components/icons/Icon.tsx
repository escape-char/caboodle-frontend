import React, { useEffect, useRef } from 'react'
import { dashToUpperCamelCase } from '../../utils'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
}

const Icon: React.FC<IconProps> = (props: IconProps): JSX.Element | null => {
  const { name } = props
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
    return <ImportedIcon className="icon" role="img" />
  }

  return null
}

export default Icon
