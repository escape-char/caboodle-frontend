import { ReactElement } from 'react'
import { BasePropsChildren } from '../types/components'
import Container from '../layout/Container'
import { classNames } from '../../utils'
import './InputLabel.scss'

export type InputLabelProps = BasePropsChildren & {
  required?: boolean
  disabled?: boolean
  inline?: boolean
}

const defaultProps = {
  required: false,
  disabled: false,
  inline: false
}

function InputLabel(props: InputLabelProps): ReactElement {
  const { disabled, children, inline, required, className, style } = props
  const classes = classNames(['input-label', className], {
    required: required,
    disabled: disabled
  })
  return (
    <Container inline={inline} className={classes} style={style}>
      <label>{children}</label>
    </Container>
  )
}

InputLabel.defaultProps = defaultProps
export default InputLabel
