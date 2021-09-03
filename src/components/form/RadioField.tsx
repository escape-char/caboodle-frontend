import React from 'react'
import { useField } from 'formik'
import Radio, { RadioProps } from '../inputs/Radio'
import { ReactElement } from 'react'
import { FormErrorMesssage, FormField, FormFieldProps } from './Form'
import { pick } from '../../utils'

export type RadioFieldProps = RadioProps & {
  name: string
  fieldProps?: FormFieldProps
  validate?: (value: any) => undefined | string | Promise<any>
}

function RadioField(props: RadioFieldProps): ReactElement {
  const { name, validate, fieldProps } = props

  const radioProps: RadioProps = pick(props, [
    'className',
    'defaultValue',
    'radioInline',
    'disabled',
    'options',
    'label',
    'onBlur',
    'onChange',
    'name',
    'required',
    'placeholder',
    'style'
  ]) as RadioProps
  const [field, meta, helpers] = useField({ name, validate })
  const hasError: boolean = meta.touched && !!meta.error

  return (
    <FormField {...fieldProps}>
      <Radio
        {...radioProps}
        onChange={(value: string | number) => {
          helpers.setValue(value, true)
          helpers.setTouched(true)
          radioProps.onChange && radioProps.onChange(value)
        }}
      />
      {hasError && <FormErrorMesssage>{meta.error}</FormErrorMesssage>}
    </FormField>
  )
}

export default RadioField
