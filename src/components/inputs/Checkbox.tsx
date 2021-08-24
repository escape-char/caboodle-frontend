import React, { ReactElement, ReactNode, useState } from 'react'
import { BaseProps } from '../types/components'
import InputLabel from './InputLabel'
import { Icon, IconSize } from '../icons'
import Container from '../layout/Container'
import { classNames } from '../../utils'
import './Checkbox.scss'

export type CheckboxProps = BaseProps & {
  defaultChecked?: boolean
  disabled?: boolean
  inline?: boolean
  label: string | ReactNode
  onChange?: (val: boolean) => void
}

const defaultProps = {
  defaultChecked: false,
  disabled: false,
  inline: false
}

function Checkbox(props: CheckboxProps): ReactElement {
  const {
    className,
    defaultChecked,
    disabled,
    inline,
    label,
    onChange,
    style
  } = props
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = (val: boolean) => {
    setChecked(val)
    onChange && onChange(val)
  }
  const classes = classNames(['checkbox', className], {
    disabled,
    checked,
    inline
  })
  return (
    <Container
      className={classes}
      style={style}
      onClick={() => {
        handleChange(!checked)
      }}
    >
      {checked && <Icon name="check-square" size={IconSize.Medium} />}
      {!checked && <Icon name="square" size={IconSize.Medium} />}
      <InputLabel inline disabled={disabled}>
        {label}
      </InputLabel>
    </Container>
  )
}

Checkbox.defaultProps = defaultProps
export default Checkbox
