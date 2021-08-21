/**
 * tests for container component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Icon from './Icon'
import { act } from 'react-dom/test-utils'

test('test rendering of icon', async () => {
  let result: any
  await act(async () => {
    result = render(<Icon name="alert-circle" />)
  })

  const elem = result?.getByRole('img')
  expect(elem).toHaveTextContent('alert-circle.svg')
  expect(elem).toHaveClass('icon')
})
