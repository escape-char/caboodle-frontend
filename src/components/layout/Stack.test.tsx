/**
 * tests for stack component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Stack, {
  HorizontalStack,
  StackDirection,
  StackItem,
  VerticalStack
} from './Stack'
import { Spacing } from '../types/components'

test('test', () => {
  expect(true)
})
test('test rendering of stack without props', () => {
  const { container } = render(
    <Stack>
      <StackItem>item1</StackItem>
    </Stack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  const item = elem?.firstChild
  expect(elem).toHaveClass('container', 'stack', 'horizontal')
  expect(elem).toHaveStyle({ padding: '8px', gap: '8px' })
  expect(item).toHaveTextContent('item1')
})

test('test passing vertical direction', () => {
  const { container } = render(
    <Stack direction={StackDirection.Vertical}>
      <StackItem>item1</StackItem>
    </Stack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  expect(elem).toHaveClass('container', 'stack', 'vertical')
})

test('test passing horizontal direction', () => {
  const { container } = render(
    <Stack direction={StackDirection.Horizontal}>
      <StackItem>item1</StackItem>
    </Stack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  expect(elem).toHaveClass('container', 'stack', 'horizontal')
})

test('test passing padding and spacing', () => {
  const { container } = render(
    <Stack padding={Spacing.Large} spacing={Spacing.Medium}>
      <StackItem>item1</StackItem>
    </Stack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  expect(elem).toHaveStyle({ padding: '24px', gap: '16px' })
})

test('test passing fluid width and height', () => {
  const { container } = render(
    <Stack fluidWidth fluidHeight>
      <StackItem>item1</StackItem>
    </Stack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  expect(elem).toHaveClass('fluid-width', 'fluid-height')
})

test('test vertical stack', () => {
  const { container } = render(
    <VerticalStack>
      <StackItem>item1</StackItem>
    </VerticalStack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  expect(elem).toHaveClass('container', 'stack', 'vertical')
})

test('test horizontal stack', () => {
  const { container } = render(
    <HorizontalStack>
      <StackItem>item1</StackItem>
    </HorizontalStack>
  )
  const elem: HTMLElement | null = container.querySelector(
    'div.container.stack'
  )
  expect(elem).toHaveClass('container', 'stack', 'horizontal')
})
