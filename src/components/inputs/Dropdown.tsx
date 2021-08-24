import React, {
  useEffect,
  useState,
  useRef,
  ReactNode,
  RefObject,
  ReactElement
} from 'react'
import { BaseProps } from '../types/components'
import InputLabel from './InputLabel'
import { classNames } from '../../utils'
import { Icon, IconSize, LoadingIcon } from '../icons'
import './Dropdown.scss'
import { LoadingSize } from '../icons/Loading'

export type DropdownItem = {
  id?: string | number
  text: string
  value: string | number
}
export type DropdownProps = BaseProps & {
  defaultValue?: number | string
  disabled?: boolean
  error?: boolean
  fluid?: boolean
  label?: string | ReactNode
  loading?: boolean
  inline?: boolean
  onChange?: (value?: string | number) => void
  options?: Array<DropdownItem>
  placeholder?: string
  required?: boolean
}

const defaultProps = {
  defaultValue: '',
  disabled: false,
  error: false,
  label: '',
  loading: false,
  inline: false,
  fluid: false,
  options: [],
  placeholder: 'select an item...',
  required: false
}

function Dropdown(props: DropdownProps): ReactElement {
  const {
    className,
    defaultValue,
    disabled,
    error,
    fluid,
    label,
    loading,
    inline,
    onChange,
    options,
    placeholder,
    required,
    style
  } = props
  const node: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const [selectedOpt, setSelectedOpt] = useState<DropdownItem | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = (e: MouseEvent) => {
    const contains = node.current?.contains(e.target as Node)

    if (!node.current || !contains) {
      setOpen(false)
    }
  }

  const handleChange = (o: DropdownItem) => {
    setOpen(false)
    setSelectedOpt(o)
    onChange && onChange(o.value)
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const selected = (options || []).find((v) => v.value === defaultValue)

    if (selected) {
      setSelectedOpt(selected)
    }
  }, [defaultValue])

  const value = selectedOpt?.value
  const text = selectedOpt?.text
  const classes = classNames(['dropdown', className], {
    error,
    inline,
    disabled,
    required,
    fluid,
    loading,
    placeholder: !value,
    focus: open
  })

  return (
    <div className={classes} ref={node} style={style}>
      {label && (
        <InputLabel disabled={disabled} required={required}>
          {label}
        </InputLabel>
      )}
      <button
        className="dropdown-button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        {loading && <LoadingIcon size={LoadingSize.Medium} />}
        <span className="text">{text || placeholder}</span>
        <Icon name="chevron-down" size={IconSize.Large} />
      </button>
      {open && (
        <ul className="dropdown-menu">
          {(options || []).map((opt, i) => {
            return (
              <li
                key={(opt.id || i) as string}
                className={
                  'dropdown-menu-item-container ' +
                  (value === opt.value ? 'selected' : '')
                }
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleChange(opt)
                }}
              >
                <div className="dropdown-menu-item">{opt.text}</div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

Dropdown.defaultProps = defaultProps
export default Dropdown
