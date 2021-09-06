import React, { ReactNode, ReactElement, useState, useEffect } from 'react'
import { BaseProps } from './types/components'
import { Container } from './layout'
import { classNames } from '../utils'
import Icon, { IconSize } from './icons/Icon'
import './Message.scss'

export enum MessageType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning'
}

export type MessageProps = BaseProps & {
  header: string
  content: string | ReactNode
  type?: MessageType
  show?: boolean
  onClose?: () => void
}

const defaultProps = {
  type: MessageType.Info,
  show: true
}

export function Message(props: MessageProps): ReactElement {
  const { header, content, type, style, className, onClose, show } = props
  const classes = classNames(['message', className], {
    hide: !show,
    info: type === MessageType.Info,
    error: type === MessageType.Error,
    success: type === MessageType.Success,
    warning: type === MessageType.Warning
  })

  const getIconType = (): string => {
    const t = type || MessageType.Info
    const lookup = {
      [MessageType.Info]: 'info',
      [MessageType.Error]: 'x-circle',
      [MessageType.Warning]: 'alert-triangle',
      [MessageType.Success]: 'check-circle'
    }
    return lookup[t]
  }
  return (
    <Container className={classes} style={style} fluidWidth>
      <Icon name={getIconType()} size={IconSize.Massive} />
      <h4 className="header">{header}</h4>
      <div className="content"> {content}</div>
      <button className="close" onClick={() => onClose && onClose()}>
        X
      </button>
    </Container>
  )
}

Message.defaultProps = defaultProps
export default Message
