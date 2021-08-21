import { ReactNode } from 'react'

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
  Justified = 'justified'
}
export enum Spacing {
  Small = '8px',
  Medium = '16px',
  Large = '24px',
  VeryLarge = '32px',
  Huge = '48px'
}

export type BaseProps = {
  className?: string
  role?: string
  style?: Record<string, unknown>
}
export type BasePropsChildren = BaseProps & {
  children?: ReactNode
}

export enum OnlyDevice {
  MobileOnly = 'mobile-only',
  MobileHidden = 'mobile-hidden',

  TabletOnly = 'tablet-only',
  TabletHidden = 'table-hidden',
  TabletOrLowerHidden = 'tablet-lower-hidden',

  SmallMonitorOnly = 'small-mon-only',
  SmallMonitorHidden = 'small-mon-hidden',
  SmallMonitorOrLowerHidden = 'small-mon-lower-hidden',

  LargeMonitorOnly = 'large-mon-only',
  LargeMonitorHidden = 'large-mon-hidden',
  LargeMonitorOrLowerHidden = 'large-mon-lower-hidden',

  WideMonitorOnly = 'wide-mon-only',
  WideeMonitorHidden = 'wide-mon-hidden',
  WideMonitorOrLowerHidden = 'wide-mon-lower-hidden'
}

export enum IconPosition {
  Left = 'left',
  Right = 'right'
}
