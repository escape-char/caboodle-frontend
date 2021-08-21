import { Spacing } from '../types/components'
import { BasePropsChildren, OnlyDevice } from '../types/components'
import Container from './Container'
import { ReactElement } from 'react'
import { classNames } from '../../utils'
import './Grid.scss'

export enum ColWidth {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Eleven,
  Twelve,
  Thirteen,
  Fourteen,
  Fifteen,
  Sixteen
}
export type GridProps = BasePropsChildren & {
  padding?: Spacing
  gap?: Spacing
}

function Grid(props: GridProps): ReactElement {
  const { padding, gap, className, style, children } = props
  const classes = classNames(['grid', className])
  return (
    <Container
      role="grid"
      className={classes}
      style={{ padding, gap, ...style }}
    >
      {children}
    </Container>
  )
}

export type GridRowProps = BasePropsChildren

export function GridRow({
  children,
  className,
  style
}: GridRowProps): ReactElement {
  const classes = classNames(['row', className])
  return (
    <Container role="row" className={classes} style={style}>
      {children}
    </Container>
  )
}

export type GridColumnProps = BasePropsChildren & {
  width?: ColWidth
  mobile?: ColWidth
  tablet?: ColWidth
  smallMonitor?: ColWidth
  largeMonitor?: ColWidth
  wideMonitor?: ColWidth
  only?: OnlyDevice
}

const defaultProps = {
  width: ColWidth.Sixteen
}

function GridColumn(props: GridColumnProps): ReactElement {
  const {
    className,
    style,
    children,
    width,
    mobile,
    tablet,
    smallMonitor,
    largeMonitor,
    wideMonitor,
    only
  } = props
  const classes = classNames(['col', className], {
    [`mobile-col${mobile}`]: mobile,
    [`tablet-col${tablet}`]: tablet,
    [`small-mon-col${smallMonitor}`]: smallMonitor,
    [`large-mon-col${largeMonitor}`]: largeMonitor,
    [`wide-mon-col${wideMonitor}`]: wideMonitor,
    [`col${width}`]: width,
    [only || '']: only
  })
  return (
    <Container role="gridcell" className={classes} style={style}>
      {children}
    </Container>
  )
}

GridColumn.defaultProps = defaultProps

export { GridColumn }
export default Grid
