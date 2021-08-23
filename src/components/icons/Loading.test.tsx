/**
 * tests for loading icon component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Loading, { LoadingProps, LoadingSize } from './Loading'

const setup = (props: LoadingProps = {}) => {
  const utils = render(<Loading {...props} />)
  const loading = utils.container.querySelector('div.icon.loading')
  return { utils, loading, props }
}

test('test rendering of loading icon', () => {
  const { loading } = setup()
  expect(loading).toBeInTheDocument()
  expect(loading).toHaveClass('icon', 'loading', 'small')
})

test('test rendering of passing in icon size', () => {
  const { loading } = setup({ size: LoadingSize.Large })
  expect(loading).toHaveClass('icon', 'loading', 'large')
})

test('test passing of style and class', () => {
  const { loading, props } = setup({
    style: { color: 'red' },
    className: 'classname'
  })
  expect(loading?.classList.contains(props.className || '')).toBe(true)
  expect(loading).toHaveStyle(props.style || {})
})
