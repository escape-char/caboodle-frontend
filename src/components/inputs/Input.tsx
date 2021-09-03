import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useState
} from 'react'
import { BaseProps } from '../types/components'
import Container from '../layout/Container'
import InputLabel from './InputLabel'
import { classNames } from '../../utils'
import { Icon, IconSize } from '../icons'
import './Input.scss'

export type InputProps = BaseProps & {
  defaultValue?: string | number
  disabled?: boolean
  error?: boolean
  icon?: string
  inline?: boolean
  label?: string | ReactNode
  onBlur?: (value: string | number, e: FocusEvent<HTMLInputElement>) => void
  onChange?: (value: string | number, e: ChangeEvent<HTMLInputElement>) => void
  name: string
  readOnly?: boolean
  required?: boolean
  type?: string
  inputRef?: any
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
    inputRef,
    type,
    placeholder,
    onChange,
    onBlur
  } = props
  const [value, setValue] = useState<string | number>(defaultValue || '')
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
    onChange && onChange(e.target.value, e)
  }
  const handleFocus = () => setFocus(true)
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(false)
    onBlur && onBlur(value, e)
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
            ref={inputRef}
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
