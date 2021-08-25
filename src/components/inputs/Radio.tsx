import { ReactElement, ReactNode, useState } from 'react'
import { classNames } from '../../utils'
import { BaseProps } from '../types/components'
import InputLabel from './InputLabel'
import Container from '../layout/Container'
import './Radio.scss'

export type RadioOption = {
  text: string
  value: string
  id?: number | string
}

export type RadioProps = BaseProps & {
  label: string | ReactNode
  defaultValue?: string | number
  required?: boolean
  disabled?: boolean
  inline?: boolean
  radioInline?: boolean
  options: Array<RadioOption>
  onChange?: (val: string | number) => void
}

const defaultProps = {
  options: [],
  defaultValue: '',
  required: false,
  inline: false,
  disabled: false
}
function Radio(props: RadioProps): ReactElement {
  const {
    className,
    label,
    defaultValue,
    disabled,
    required,
    inline,
    onChange,
    options,
    radioInline,
    style
  } = props
  const [value, setValue] = useState<string | number | undefined>(defaultValue)

  const handleChange = (r: RadioOption) => {
    if (disabled) {
      return
    }
    setValue(r.value)
    onChange && onChange(r.value)
  }
  const classes = classNames(['radio-container', className], {
    inline
  })
  const radioClasses = classNames(['radios'], { inline: radioInline, disabled })

  return (
    <Container className={classes} style={style}>
      <InputLabel disabled={disabled} required={required}>
        {label}
      </InputLabel>
      <ul className={radioClasses}>
        {options.map((v, i) => (
          <li
            className={'radio ' + (value === v.value ? 'checked' : '')}
            key={v.id || i}
            onClick={() => handleChange(v)}
          >
            <div className="checkmark"></div>
            <InputLabel disabled={disabled} inline>
              {v.text}
            </InputLabel>
          </li>
        ))}
      </ul>
    </Container>
  )
}

Radio.defaultProps = defaultProps
export default Radio
