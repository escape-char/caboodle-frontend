import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'

const setup = (props: ButtonProps = {}) => {
  const TEXT = 'text'
  const utils = render(<Button {...props}>{TEXT}</Button>)
  const button = utils.getByRole('button')
  return { utils, button, props, text: TEXT }
}

test('test rendering of button', () => {
  const { button, text } = setup()
  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('button', 'medium', 'tertiary')
  expect(button).toHaveTextContent(text)
})

test('test rendering of primary button', () => {
  const { button } = setup({ type: ButtonType.Primary })
  expect(button).toHaveClass('button', 'medium', 'primary')
})

test('test rendering of secondary button', () => {
  const { button } = setup({ type: ButtonType.Secondary })
  expect(button).toHaveClass('button', 'medium', 'secondary')
})

test('test rendering of positive button', () => {
  const { button } = setup({ type: ButtonType.Positive })
  expect(button).toHaveClass('button', 'medium', 'positive')
})

test('test rendering of negative button', () => {
  const { button } = setup({ type: ButtonType.Negative })
  expect(button).toHaveClass('button', 'medium', 'negative')
})

test('test rendering of tertiary button', () => {
  const { button } = setup({ type: ButtonType.Tertiary })
  expect(button).toHaveClass('button', 'medium', 'tertiary')
})

test('test rendering of small button', () => {
  const { button } = setup({ size: ButtonSize.Small })
  expect(button).toHaveClass('button', 'small')
})

test('test rendering of large button', () => {
  const { button } = setup({ size: ButtonSize.Large })
  expect(button).toHaveClass('button', 'large')
})

test('test rendering of huge button', () => {
  const { button } = setup({ size: ButtonSize.Huge })
  expect(button).toHaveClass('button', 'huge')
})

test('test rendering of disabled', () => {
  const { button } = setup({ disabled: true })
  expect(button).toHaveClass('disabled')
  expect(button).toHaveAttribute('disabled')
})

test('test rendering of fluid', () => {
  const { button } = setup({ fluid: true })
  expect(button).toHaveClass('fluid')
})

test('test rendering of loading', () => {
  const { button, utils } = setup({ loading: true })
  const loading = utils.container.querySelector('div.icon.loading')
  expect(button).toHaveClass('loading')
  expect(loading).toBeInTheDocument()
  expect(loading).toHaveClass('icon', 'loading', 'medium')
})

test('test handling of onClick event', () => {
  const onClickMock = jest.fn()
  const { button } = setup({ onClick: onClickMock })
  fireEvent.click(button)
  expect(onClickMock).toBeCalled()
})
