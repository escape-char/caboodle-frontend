/**
 * tests for radio component
 */

import React from 'react'
import { render, fireEvent, createEvent } from '@testing-library/react'
import Radio, { RadioProps } from './Radio'

const options = [
  {
    id: 1,
    text: 'text1',
    value: 'value1'
  },
  {
    id: 2,
    text: 'text2',
    value: 'value2'
  },
  {
    id: 3,
    text: 'text3',
    value: 'value3'
  }
]
const setup = (props: RadioProps) => {
  const utils = render(<Radio {...props} />)
  const radioContainer = utils.container.querySelector(
    'div.container.radio-container'
  )
  const radios = utils.container.querySelector('ul.radios')
  return { radioContainer, radios, utils, props }
}
test('test rendering of radio', () => {
  const { utils, radioContainer, props, radios } = setup({
    options,
    label: 'testlabel'
  })
  expect(radioContainer).toBeInTheDocument()
  expect(radios).toBeInTheDocument()
  expect(radios).toHaveClass('radios')
  expect(radios?.childNodes.length).toBe(3)

  const label = utils.getByText(props.label as string)

  expect(label).toBeInTheDocument
  expect(label.parentElement).toHaveClass('input-label')
})

test('test selecting option in radio', () => {
  const onChangeMock = jest.fn()
  const { radios } = setup({
    options,
    label: 'testlabel',
    onChange: onChangeMock
  })
  const option2 = radios?.childNodes[1] as Node
  const event = createEvent.click(option2)

  fireEvent.click(option2, event)

  expect(onChangeMock).toBeCalledWith(options[1].value)
  expect(option2).toHaveClass('checked')
})

test('test default value for radio', () => {
  const { radios } = setup({
    options,
    label: 'testlabel',
    defaultValue: options[1].value
  })
  const option2 = radios?.childNodes[1] as Node
  expect(option2).toHaveClass('checked')
})

test('test when radio is disabled', () => {
  const { radios } = setup({
    options,
    label: 'testlabel',
    disabled: true
  })

  expect(radios).toHaveClass('disabled')
})

test('test displaying radios inline', () => {
  const { radios } = setup({
    options,
    label: 'testlabel',
    radioInline: true
  })

  expect(radios).toHaveClass('inline')
})

test('test displaying container inline', () => {
  const { radioContainer } = setup({
    options,
    label: 'testlabel',
    inline: true
  })

  expect(radioContainer).toHaveClass('inline')
})

test('test passing style and className', () => {
  const className = 'testclass'
  const style = { color: 'blue' }
  const { radioContainer } = setup({
    options,
    label: 'testlabel',
    className,
    style
  })

  expect(radioContainer).toHaveClass(className)
  expect(radioContainer).toHaveStyle(style)
})
