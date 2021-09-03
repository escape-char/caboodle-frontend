import React from 'react'
import { useField } from 'formik'
import Checkbox, { CheckboxProps } from '../inputs/Checkbox'
import { ReactElement } from 'react'
import { FormErrorMesssage, FormField, FormFieldProps } from './Form'
import { pick } from '../../utils'

export type CheckboxFieldProps = CheckboxProps & {
  name: string
  fieldProps?: FormFieldProps
  validate?: (value: any) => undefined | string | Promise<any>
}

function CheckboxField(props: CheckboxFieldProps): ReactElement {
  const { name, validate, fieldProps } = props

  const checkboxProps: CheckboxProps = pick(props, [
    'className',
    'defaultChecked',
    'disabled',
    'inline',
    'label',
    'onChange',
    'name',
    'placeholder',
    'style'
  ]) as CheckboxProps
  const [field, meta, helpers] = useField({ name, validate })
  const hasError: boolean = meta.touched && !!meta.error

  return (
    <FormField {...fieldProps}>
      <Checkbox
        {...checkboxProps}
        onChange={(value: boolean) => {
          helpers.setValue(value)
          helpers.setTouched(true)
          checkboxProps.onChange && checkboxProps.onChange(value)
        }}
      />
      {hasError && <FormErrorMesssage>{meta.error}</FormErrorMesssage>}
    </FormField>
  )
}

export default CheckboxField
