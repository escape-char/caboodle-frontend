import { ChangeEvent, ReactElement, ReactNode, useState } from 'react'
import { BaseProps, IconPosition } from '../types/components'
import Container from '../layout/Container'
import InputLabel from './InputLabel'
import { classNames } from '../../utils'
import { Icon, IconSize } from '../icons'
import './Input.scss'

export type InputProps = BaseProps & {
  defaultValue?: string | number
  disabled: boolean
  error?: boolean
  icon?: string
  inline?: boolean
  label?: string | ReactNode
  onBlur?: (value?: string | number) => void
  onChange?: (value?: string | number) => void
  name: string
  readOnly?: boolean
  required?: boolean
  type?: string
  placeholder?: string
}

const defaultProps = {
  defaultValue: '',
  disabled: false,
  error: false,
  inline: false,
  readOnly: false,
  required: false,
  type: 'text',
  placeholder: 'enter value...'
}

function Input(props: InputProps): ReactElement {
  const {
    defaultValue,
    disabled,
    error,
    name,
    readOnly,
    required,
    label,
    inline,
    icon,
    type,
    placeholder,
    onChange,
    onBlur
  } = props
  const [value, setValue] = useState<string | number | undefined>(defaultValue)
  const [focus, setFocus] = useState<boolean>(false)

  const classes = classNames(['input-container', props.className], {
    disabled: disabled,
    focus: focus,
    error: error,
    icon: icon,
    required: required,
    'read-only': readOnly,
    inline: inline
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }
  const handleFocus = () => setFocus(true)
  const handleBlur = () => {
    setFocus(false)
    onBlur && onBlur(value)
  }
  return (
    <Container className={classes} style={props.style}>
      {label && (
        <InputLabel required={required} disabled={disabled} inline={inline}>
          {label}
        </InputLabel>
      )}
      <Container className={'input'}>
        {icon && <Icon name={icon} size={IconSize.Large} />}
        {!readOnly && (
          <input
            name={name}
            type={type}
            readOnly={readOnly}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
          />
        )}
        {readOnly && <p>{value}</p>}
      </Container>
    </Container>
  )
}

Input.defaultProps = defaultProps

export default Input
