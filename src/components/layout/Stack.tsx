import { ReactElement } from 'react'
import { BasePropsChildren, Spacing } from '../types/components'
import Container from './Container'
import { classNames } from '../../utils'
import './Stack.scss'

export enum StackDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export enum JustifyContent {
  Left = 'left',
  Right = 'right'
}

type BaseStackProps = BasePropsChildren & {
  spacing?: Spacing
  padding?: Spacing
  fluidHeight?: boolean
  fluidWidth?: boolean
  justifyContent?: JustifyContent
}

export type StackProps = BaseStackProps & {
  direction?: StackDirection
}
const baseDefaultProps = {
  padding: Spacing.Small,
  spacing: Spacing.Small,
  fluidWidth: false,
  fluidHeigh: false
}
const stackDefaultProps = {
  direction: StackDirection.Horizontal,
  ...baseDefaultProps
}

function Stack(props: StackProps): ReactElement {
  const {
    children,
    fluidHeight,
    fluidWidth,
    className,
    style,
    direction,
    justifyContent,
    padding,
    spacing
  } = props
  const classes = classNames(['stack', className], {
    vertical: direction === StackDirection.Vertical,
    horizontal: direction === StackDirection.Horizontal
  })

  return (
    <Container
      className={classes}
      fluidHeight={fluidHeight}
      fluidWidth={fluidWidth}
      padding={padding}
      style={{ gap: spacing, justifyContent, ...style }}
    >
      {children}
    </Container>
  )
}

export type StackItemProps = BasePropsChildren & {
  padding?: Spacing
  width?: number | string
  height?: number | string
}

const stackItemDefaultProps = {
  padding: Spacing.Small
}
function StackItem(props: StackItemProps): ReactElement {
  const classes = classNames(['stack-item', props.className])
  return <Container {...props} className={classes} />
}

function HorizontalStack(props: BaseStackProps): ReactElement {
  return <Stack direction={StackDirection.Horizontal} {...props} />
}

function VerticalStack(props: BaseStackProps): ReactElement {
  return <Stack direction={StackDirection.Vertical} {...props} />
}

StackItem.defaultProps = stackItemDefaultProps
HorizontalStack.defaultProps = baseDefaultProps
VerticalStack.defaultProps = baseDefaultProps
Stack.defaultProps = stackDefaultProps

export { StackItem, VerticalStack, HorizontalStack }
export default Stack
