import { MouseEvent, ReactElement } from 'react'
import { classNames } from '../../utils'
import { BasePropsChildren } from '../types/components'
import { LoadingIcon } from '../icons'
import { LoadingSize } from '../icons/Loading'
import './Button.scss'

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Negative = 'negative',
  Positive = 'positive'
}

export enum ButtonSize {
  Tiny = 'tiny',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Huge = 'huge',
  Massive = 'massive'
}
export type ButtonProps = BasePropsChildren & {
  type?: ButtonType
  loading?: boolean
  onClick?: (e: MouseEvent) => void
  role?: string
  disabled?: boolean
  size?: ButtonSize
  fluid?: boolean
}

const defaultProps = {
  type: ButtonType.Tertiary,
  loading: false,
  disabled: false,
  size: ButtonSize.Medium,
  fluid: false
}

function Button(props: ButtonProps): ReactElement {
  const {
    className,
    disabled,
    children,
    fluid,
    loading,
    onClick,
    role,
    size,
    type
  } = props
  const classes = classNames(['button', type, size, className], {
    fluid: fluid,
    loading: loading,
    disabled: disabled
  })
  const iconSizeLookup: Record<string, string> = {
    [ButtonSize.Small]: LoadingSize.Small,
    [ButtonSize.Medium]: LoadingSize.Medium,
    [ButtonSize.Large]: LoadingSize.Large,
    [ButtonSize.Huge]: LoadingSize.Large,
    [ButtonSize.Massive]: LoadingSize.Large
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    onClick && onClick(e)
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      role={role}
    >
      {loading && (
        <LoadingIcon size={iconSizeLookup[size || ''] as LoadingSize} />
      )}
      {children}
    </button>
  )
}

Button.defaultProps = defaultProps

export default Button
