import { ReactElement } from 'react'
import { classNames } from '../../utils'
import { Spacing, BasePropsChildren } from '../types/components'
import './Container.scss'

type ContainerProps = BasePropsChildren & {
  fluidWidth?: boolean
  fluidHeight?: boolean
  height?: string | number
  width?: string | number
  role?: string
  padding?: Spacing | string
  inline?: boolean
}

const defaultProps = {
  fluidWidth: false,
  fluidHeight: false,
  inline: false,
  role: 'group',
  style: {}
}

function Container(props: ContainerProps): ReactElement {
  const {
    className,
    children,
    fluidWidth,
    fluidHeight,
    style,
    width,
    inline,
    height,
    role,
    padding
  } = props
  const classes = classNames(['container', className], {
    'fluid-width': fluidWidth,
    'fluid-height': fluidHeight,
    inline: inline
  })
  return (
    <div
      role={role}
      className={classes}
      style={{ width, height, padding, ...style }}
    >
      {children}
    </div>
  )
}

Container.defaultProps = defaultProps

export default Container
