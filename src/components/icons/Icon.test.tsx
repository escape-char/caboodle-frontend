/**
 * tests for container component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Icon, { IconSize } from './Icon'
import { act } from 'react-dom/test-utils'

test('test rendering of icon', async () => {
  let result: any

  await act(async () => {
    result = render(<Icon name="alert-circle" />)
  })
  const elem = result?.container.querySelector('svg.icon')
  expect(elem).toHaveTextContent('alert-circle.svg')
  expect(elem).toHaveClass('icon')
  expect(elem).toHaveAttribute('width', '14')
  expect(elem).toHaveAttribute('height', '14')
})

test('test passing size', async () => {
  let result: any

  await act(async () => {
    result = render(<Icon name="alert-circle" size={IconSize.Large} />)
  })
  const elem = result?.container.querySelector('svg.icon')
  expect(elem).toHaveAttribute('width', '24')
  expect(elem).toHaveAttribute('height', '24')
})
