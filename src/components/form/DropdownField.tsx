import React from 'react'
import { useField } from 'formik'
import Dropdown, { DropdownProps } from '../inputs/Dropdown'
import { ReactElement } from 'react'
import { FormErrorMesssage, FormField, FormFieldProps } from './Form'
import { pick } from '../../utils'

export type DropdownFieldProps = DropdownProps & {
  name: string
  fieldProps?: FormFieldProps
  validate?: (value: any) => undefined | string | Promise<any>
}

function DropdownField(props: DropdownFieldProps): ReactElement {
  const { name, validate, fieldProps } = props

  const dropdownProps: DropdownProps = pick(props, [
    'className',
    'defaultValue',
    'disabled',
    'error',
    'inline',
    'loading',
    'options',
    'label',
    'onBlur',
    'onChange',
    'name',
    'required',
    'placeholder',
    'style'
  ]) as DropdownProps
  const [field, meta, helpers] = useField({ name, validate })
  const hasError: boolean = meta.touched && !!meta.error

  return (
    <FormField {...fieldProps}>
      <Dropdown
        {...dropdownProps}
        onChange={(value: string | number | undefined) => {
          helpers.setValue(value, true)
          dropdownProps.onChange && dropdownProps.onChange(value)
        }}
        onBlur={(value: string | number | undefined) => {
          helpers.setTouched(true)
          dropdownProps.onBlur && dropdownProps.onBlur(value)
        }}
        error={hasError}
      />
      {hasError && <FormErrorMesssage>{meta.error}</FormErrorMesssage>}
    </FormField>
  )
}

export default DropdownField
