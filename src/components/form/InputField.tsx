import React, { ChangeEvent, FocusEvent } from 'react'
import { useField } from 'formik'
import Input, { InputProps } from '../inputs/Input'
import { ReactElement } from 'react'
import { FormErrorMesssage, FormField, FormFieldProps } from './Form'
import { pick } from '../../utils'

export type InputFieldProps = InputProps & {
  fieldProps?: FormFieldProps
  validate?: (value: any) => undefined | string | Promise<any>
}

function InputField(props: InputFieldProps): ReactElement {
  const { name, validate, fieldProps } = props

  const inputProps: InputProps = pick(props, [
    'className',
    'defaultValue',
    'disabled',
    'error',
    'icon',
    'inline',
    'label',
    'onBlur',
    'onChange',
    'name',
    'readOnly',
    'required',
    'type',
    'placeholder',
    'style'
  ]) as InputProps
  const [field, meta, helpers] = useField({ name, validate })
  const hasError: boolean = meta.touched && !!meta.error

  return (
    <FormField {...fieldProps}>
      <Input
        {...inputProps}
        onChange={(
          value: string | number,
          e: ChangeEvent<HTMLInputElement>
        ) => {
          field.onChange(e)
          inputProps.onChange && inputProps.onChange(value, e)
        }}
        onBlur={(value: string | number, e: FocusEvent<HTMLInputElement>) => {
          field.onBlur(e)
          inputProps.onBlur && inputProps.onBlur(value, e)
        }}
        error={hasError}
      />
      {hasError && <FormErrorMesssage>{meta.error}</FormErrorMesssage>}
    </FormField>
  )
}

export default InputField
