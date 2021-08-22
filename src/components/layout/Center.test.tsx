/**
 * tests for center component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Center from './Center'
import { Spacing } from '../types/components'

const TEXT = 'content'

test('test rendering of center', () => {
  const { getByText } = render(<Center>{TEXT}</Center>)
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toBeInTheDocument()
  expect(elem).toHaveTextContent(TEXT)
  expect(elem).toHaveClass('container center hor')
})

test('test passing className and styles', () => {
  const className = 'myclass'
  const style = { color: 'red' }
  const { getByText } = render(
    <Center className={className} style={style}>
      {TEXT}
    </Center>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveClass(className)
  expect(elem).toHaveStyle(style)
})

test('test passing width and height', () => {
  const width = 200
  const height = 100
  const { getByText } = render(
    <Center width={width} height={height}>
      {TEXT}
    </Center>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveStyle({ width: `${width}px`, height: `${height}px` })
})

test('test vertical center', () => {
  const { getByText } = render(
    <Center fluidHeight centerHor={false} centerVer>
      {TEXT}
    </Center>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveClass('center', 'container', 'ver', 'fluid-height')
})

test('test vertical and hor center', () => {
  const { getByText } = render(
    <Center fluidHeight centerHor centerVer>
      {TEXT}
    </Center>
  )
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveClass(
    'center',
    'hor',
    'ver',
    'fluid-height',
    'fluid-width'
  )
})

test('test passing padding', () => {
  const { getByText } = render(<Center padding={Spacing.Large}>{TEXT}</Center>)
  const elem: HTMLElement = getByText(TEXT)

  //test submit button is in document
  expect(elem).toHaveStyle({ padding: `${24}px` })
})
