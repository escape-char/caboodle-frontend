/**
 * tests for input component
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Input from './Input'

const setup = (props: any) => {
  const placeholder = props.placeholder || /enter value\.\.\./i
  const utils = render(<Input {...props} />)
  const input = utils.getByPlaceholderText(placeholder)
  const label = utils.getByText(props.label)

  return {
    input,
    label,
    ...utils,
    props
  }
}
test('test rendering of input', () => {
  const { input, label, props } = setup({
    name: 'input1',
    label: 'test label',
    defaultValue: 'default-value'
  })

  expect(input).toBeInTheDocument()
  expect(input.parentElement?.parentElement).toHaveClass(
    'container',
    'input-container'
  )
  expect(input.parentElement).toHaveClass('container', 'input')
  expect(input).toHaveAttribute('value', props.defaultValue)
  expect(input).toHaveAttribute('name', props.name)

  expect(label).toBeInTheDocument()
  expect(label.parentElement).toHaveClass('container', 'input-label')
})

test('test onChange event in input', () => {
  const onChangeMock = jest.fn()
  const changeValue = 'changevalue'

  const { input } = setup({
    label: 'test label',
    name: 'test1',
    onChange: onChangeMock
  })

  expect(input).toHaveAttribute('value', '')
  fireEvent.change(input, { target: { value: changeValue } })

  expect(input).toHaveAttribute('value', changeValue)
  expect(onChangeMock).toHaveBeenCalledWith(changeValue)
})

test('test onBlur event for input', () => {
  const onBlurMock = jest.fn()

  const { input, props } = setup({
    name: 'input1',
    defaultValue: 'defaultvalue',
    label: 'test label',
    onBlur: onBlurMock
  })

  fireEvent.blur(input)
  expect(onBlurMock).toHaveBeenCalledWith(props.defaultValue)
})

test('test focus event for input', () => {
  const { input } = setup({
    name: 'input1',
    defaultValue: 'defaultvalue',
    label: 'test label'
  })

  fireEvent.focus(input)

  const root = input.parentElement?.parentElement

  expect(root).toHaveClass('focus')

  fireEvent.blur(input)

  expect(root?.classList.contains('focus')).toBe(false)
})

test('test passing in placeholder', () => {
  const { input, props } = setup({
    name: 'input1',
    placeholder: 'placeholder',
    label: 'test label'
  })

  expect(input).toHaveAttribute('placeholder', props.placeholder)
})

test('test passing in disabled', () => {
  const { input, label } = setup({
    name: 'input1',
    label: 'test label',
    disabled: true
  })

  expect(input).toHaveAttribute('disabled')
  expect(label.parentElement).toHaveClass('disabled')
  expect(input.parentElement?.parentElement).toHaveClass('disabled')
})

test('test passing in required', () => {
  const { input, label } = setup({
    name: 'input1',
    label: 'test label',
    required: true
  })

  expect(label.parentElement).toHaveClass('required')
  expect(input.parentElement?.parentElement).toHaveClass('required')
})

test('test passing in error', () => {
  const { input } = setup({
    name: 'input1',
    label: 'test label',
    error: true
  })

  expect(input.parentElement?.parentElement).toHaveClass('error')
})

test('test passing in icon', async () => {
  let result: any

  await act(async () => {
    result = setup({
      name: 'input1',
      label: 'test label',
      icon: 'alert-circle'
    })
  })
  const { container, input } = result
  const icon = container.querySelector('svg.icon')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveTextContent('alert-circle.svg')
  expect(icon).toHaveClass('icon')
  expect(icon).toHaveAttribute('width', '24')
  expect(icon).toHaveAttribute('height', '24')

  expect(input.parentElement?.parentElement).toHaveClass('icon')
})

test('test passing in readOnly', async () => {
  const props = {
    name: 'readOnly',
    readOnly: true,
    defaultValue: 'readOnly',
    label: 'read only'
  }
  const utils = render(<Input {...props} />)

  const textEl = utils.getByText(props.defaultValue)
  const inputEl = utils.container.querySelector(
    '.container-input > .input > input'
  )

  expect(textEl).toBeInTheDocument()
  expect(textEl.parentElement?.parentElement).toHaveClass('read-only')
  expect(inputEl).toBe(null)
})

test('test passing in inline', () => {
  const { input, label } = setup({
    name: 'input1',
    label: 'test label',
    inline: true
  })

  expect(input.parentElement?.parentElement).toHaveClass('inline')
  expect(label.parentElement).toHaveClass('inline')
})

test('test passing in type', () => {
  const { input, props } = setup({
    name: 'input1',
    label: 'test label',
    type: 'password'
  })
  expect(input).toHaveAttribute('type', props.type)
})
