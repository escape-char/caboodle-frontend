/**
 * tests for container component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Container from './Container'
import { Spacing } from '../types/components'

const TEXT = 'content'

test('test rendering of container', () => {
  const { getByText } = render(<Container>{TEXT}</Container>)
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toBeInTheDocument()
  expect(elem).toHaveTextContent(TEXT)
  expect(elem).toHaveClass('container')
})

test('test rendering of inline', () => {
  const { getByText } = render(<Container inline>{TEXT}</Container>)
  const elem: HTMLElement = getByText(TEXT)

  expect(elem).toHaveClass('inline', 'container')
})

test('test rendering of fluid width', () => {
  const { getByText } = render(<Container fluidWidth>{TEXT}</Container>)
  const elem: HTMLElement = getByText(TEXT)

  expect(elem).toHaveClass('fluid-width', 'container')
})

test('test rendering of fluid height', () => {
  const { getByText } = render(<Container fluidHeight>{TEXT}</Container>)
  const elem: HTMLElement = getByText(TEXT)

  expect(elem).toHaveClass('fluid-height', 'container')
})

test('test rendering of style', () => {
  const style = { color: 'blue' }
  const { getByText } = render(<Container style={style}>{TEXT}</Container>)
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveStyle(style)
})

test('test rendering of passing width and height', () => {
  const { getByText } = render(
    <Container width={20} height={30}>
      {TEXT}
    </Container>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveStyle({ width: '20px', height: '30px' })
})

test('test rendering of padding', () => {
  const { getByText } = render(
    <Container padding={Spacing.Small}>{TEXT}</Container>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveStyle({ padding: `8px` })
})

test('test rendering of className', () => {
  const className = 'test-class'
  const { getByText } = render(
    <Container className={className}>{TEXT}</Container>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveClass(className)
})
