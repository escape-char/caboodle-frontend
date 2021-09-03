import React, { FormEventHandler, ReactElement } from 'react'
import { withFormik, FormikValues, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Grid, {
  GridColumn,
  GridColumnProps,
  GridProps,
  GridRow,
  GridRowProps
} from '../layout/Grid'
import { BasePropsChildren, Spacing } from '../types/components'
import ButtonList, {
  ButtonListProps,
  JustifyContent
} from '../inputs/ButtonList'
import { classNames } from '../../utils'
import './Form.scss'

export type FormProps = BasePropsChildren &
  GridProps & {
    values: FormikValues
    handleSubmit: FormEventHandler<HTMLFormElement>
  }

const defaultProps = {
  padding: Spacing.Medium
}

function Form(props: FormProps): ReactElement {
  const { className, children, padding, handleSubmit, gap, style } = props
  const classes = classNames(['form', className])

  return (
    <Grid padding={padding} gap={gap} className={classes} style={style}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Grid>
  )
}

export type FormGroupProps = GridRowProps
export function FormGroup(props: FormGroupProps): ReactElement {
  return <GridRow className="form-group" {...props} />
}

export type FormFieldProps = GridColumnProps
export function FormField(props: FormFieldProps): ReactElement {
  return <GridColumn className={'form-field'} {...props} />
}

Form.defaultProps = defaultProps

export type FormErrorMessageProps = BasePropsChildren
export function FormErrorMesssage({
  children
}: FormErrorMessageProps): ReactElement {
  return <p className="error">{children}</p>
}

export type FormFooterProps = ButtonListProps
export function FormFooter(props: FormFooterProps): ReactElement {
  return <ButtonList {...props} justifyContent={JustifyContent.Right} />
}

export type EnhancedFormProps = {
  name?: string
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>
  schema: Yup.AnyObjectSchema
  initialValues: FormikValues
}

const EnhancedForm = withFormik({
  mapPropsToValues: (props: any) => {
    return { ...props.initialValues }
  },
  handleSubmit: (values: FormikValues, { props, ...rest }) => {
    return props.onSubmit && props.onSubmit(values, rest)
  },
  validationSchema: ({ schema }: EnhancedFormProps) => {
    return schema
  }
})(Form)

export default EnhancedForm
