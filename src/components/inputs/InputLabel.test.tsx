/**
 * tests for input label component
 */

import React from 'react'
import { render } from '@testing-library/react'
import InputLabel from './InputLabel'

test('test rendering of input label', () => {
  const TEXT = 'text'
  const { getByText } = render(<InputLabel>{TEXT}</InputLabel>)
  const elem: HTMLElement = getByText(TEXT)
  expect(elem).toBeInTheDocument()
  expect(elem).toHaveTextContent(TEXT)
  expect(elem.parentElement).toHaveClass('container', 'input-label')
})

test('test rendering of required', () => {
  const TEXT = 'text'
  const { getByText } = render(<InputLabel required>{TEXT}</InputLabel>)
  const elem: HTMLElement = getByText(TEXT)
  expect(elem.parentElement).toHaveClass('required')
})

test('test rendering of disabled', () => {
  const TEXT = 'text'
  const { getByText } = render(<InputLabel disabled>{TEXT}</InputLabel>)
  const elem: HTMLElement = getByText(TEXT)
  expect(elem.parentElement).toHaveClass('disabled')
})

test('test rendering of inline', () => {
  const TEXT = 'text'
  const { getByText } = render(<InputLabel inline>{TEXT}</InputLabel>)
  const elem: HTMLElement = getByText(TEXT)
  expect(elem.parentElement).toHaveClass('inline')
})

test('test rendering of style and className', () => {
  const TEXT = 'text'
  const className = 'test-class'
  const style = { color: 'blue' }

  const { getByText } = render(
    <InputLabel className={className} style={style}>
      {TEXT}
    </InputLabel>
  )
  const elem: HTMLElement = getByText(TEXT)
  expect(elem.parentElement).toHaveClass(className)
  expect(elem.parentElement).toHaveStyle(style)
})
