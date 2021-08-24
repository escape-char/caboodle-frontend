import React from 'react'
import { fireEvent, render, createEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Checkbox, { CheckboxProps } from './Checkbox'

const setup = async (props: CheckboxProps) => {
  let utils: any
  await act(async () => {
    utils = render(<Checkbox {...props} />)
  })
  const checkbox = utils.container.querySelector('div.container.checkbox')
  return { checkbox, utils, props }
}

test('test rendering of checkbox', async () => {
  const { checkbox, utils, props } = await setup({ label: 'testing' })
  expect(checkbox).toBeInTheDocument()
  expect(checkbox).toHaveClass('checkbox')

  const label = utils.getByText(props.label)
  expect(label).toBeInTheDocument()
  expect(label.parentElement).toHaveClass('input-label')

  const icon = utils.container.querySelector('svg.icon')
  expect(icon).toBeInTheDocument()
  expect(icon).toHaveTextContent('square.svg')
})

test('test checkbox on change', async () => {
  const onChangeMock = jest.fn()
  const { checkbox, utils } = await setup({
    label: 'testing',
    onChange: onChangeMock
  })
  const event = createEvent.click(checkbox)

  await act(async () => {
    fireEvent.click(checkbox, event)
  })

  expect(checkbox).toHaveClass('checked')
  expect(onChangeMock).toHaveBeenLastCalledWith(true)

  const icon = utils.container.querySelector('svg.icon')
  expect(icon).toHaveTextContent('check-square.svg')
})

test('test checkbox on defaultChecked', async () => {
  const { checkbox, utils } = await setup({
    label: 'testing',
    defaultChecked: true
  })

  expect(checkbox).toHaveClass('checked')

  const icon = utils.container.querySelector('svg.icon')
  expect(icon).toHaveTextContent('check-square.svg')
})

test('test checkbox disabled', async () => {
  const { checkbox, utils, props } = await setup({
    label: 'testing',
    disabled: true
  })

  expect(checkbox).toHaveClass('disabled')

  const label = utils.getByText(props.label)
  expect(label.parentElement).toHaveClass('disabled')
})

test('test inline checkbox', async () => {
  const { checkbox } = await setup({
    label: 'testing',
    inline: true
  })
  expect(checkbox).toHaveClass('inline')
})

test('test passing className and style', async () => {
  const className = 'testclass'
  const style = { color: 'blue' }
  const { checkbox } = await setup({
    label: 'testing',
    style,
    className
  })
  expect(checkbox).toHaveClass(className)
  expect(checkbox).toHaveStyle(style)
})
