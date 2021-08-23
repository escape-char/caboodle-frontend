import { ReactElement } from 'react'
import { classNames } from '../../utils'
import { BaseProps } from '../types/components'
import './Loading.scss'

export enum LoadingSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Huge = 'huge',
  Massive = 'massive'
}

export type LoadingProps = BaseProps & {
  size?: LoadingSize
}

const defaultProps = { size: LoadingSize.Small }

function Loading(props: LoadingProps): ReactElement {
  const { size, style, className } = props
  const classes = classNames(['icon', 'loading', size?.toString(), className])

  return <div className={classes} style={style}></div>
}

Loading.defaultProps = defaultProps
export default Loading
