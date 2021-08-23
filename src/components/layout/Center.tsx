import { BasePropsChildren, Spacing } from '../types/components'
import { ReactElement } from 'react'
import { classNames } from '../../utils'
import Container from './Container'
import './Center.scss'

export type CenterProps = BasePropsChildren & {
  width?: string | number
  height?: string | number
  fluidHeight?: boolean
  fluidWidth?: boolean
  centerHor?: boolean
  centerVer?: boolean
  padding?: Spacing | string
}

const defaultProps = {
  fluidWidth: true,
  fluidHeight: false,
  centerHor: true
}

function Center(props: CenterProps): ReactElement {
  const {
    children,
    className,
    width,
    height,
    centerHor,
    centerVer,
    fluidWidth,
    fluidHeight,
    style,
    padding
  } = props

  const classes = classNames(['center', className], {
    hor: centerHor,
    ver: centerVer
  })

  return (
    <Container
      className={classes}
      padding={padding}
      width={width}
      height={height}
      fluidHeight={fluidHeight}
      fluidWidth={fluidWidth}
      style={style}
    >
      {children}
    </Container>
  )
}

Center.defaultProps = defaultProps
export default Center
