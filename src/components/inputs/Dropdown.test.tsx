import React from 'react'
import { fireEvent, render, createEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Dropdown, { DropdownProps, DropdownItem } from './Dropdown'

const options: Array<DropdownItem> = [
  {
    id: 1,
    value: 'value1',
    text: 'text1'
  },
  {
    id: 2,
    value: 'value2',
    text: 'text2'
  },
  {
    id: 3,
    value: 'value3',
    text: 'text3'
  }
]

const setup = async (props?: DropdownProps) => {
  const p = props || {}
  let utils: any
  await act(async () => {
    utils = render(<Dropdown {...p} />)
  })
  const dropdown = utils.container.querySelector('div.dropdown')
  const dropdownBtn = utils.getByRole('button')
  return { utils, dropdown, dropdownBtn, props }
}

test('test rendering of dropdown', async () => {
  const { dropdown, dropdownBtn, utils } = await setup()
  expect(dropdown).toBeInTheDocument()
  expect(dropdown).toHaveClass('dropdown')

  expect(dropdownBtn).toBeInTheDocument()
  expect(dropdownBtn).toHaveClass('dropdown-button')

  const text = utils.container.querySelector('span.text')
  const icon = utils.container.querySelector('svg.icon')

  expect(text).toBeInTheDocument()
  expect(text).toHaveTextContent('select an item...')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveTextContent('chevron-down.svg')
})

test('test changing option', async () => {
  const onChangeMock = jest.fn()
  const { dropdown, dropdownBtn, utils } = await setup({
    options,
    onChange: onChangeMock
  })

  let event = createEvent.click(dropdownBtn)

  //test that clicking dropdown brings up menu
  fireEvent.click(dropdownBtn, event)
  const dropdownMenu: Element | null =
    utils.container.querySelector('ul.dropdown-menu')
  expect(dropdown).toHaveClass('focus')
  expect(dropdownMenu).toBeInTheDocument()
  expect(dropdownMenu?.children.length).toBe(3)

  //test selecting an option populates button text
  const option = utils.getByText('text3')
  event = createEvent.click(option)
  fireEvent.click(option, event)
  const text = utils.container.querySelector('span.text')
  expect(text).toHaveTextContent('text3')

  //test the option appears as selected in the menu
  fireEvent.click(dropdownBtn, event)
  const selected = utils.container.querySelector(
    'li.dropdown-menu-item-container.selected'
  )
  expect(onChangeMock).toBeCalledWith('value3')
  expect(selected).toBeInTheDocument()
  expect(selected).toHaveTextContent('text3')
})

test('test passing style and className', async () => {
  const style = { color: 'red' }
  const className = 'testclass'
  const { dropdown } = await setup({ style, className })

  expect(dropdown).toHaveClass(className)
  expect(dropdown).toHaveStyle(style)
})

test('test default value', async () => {
  const defaultValue = options[1].value
  const { dropdownBtn, utils } = await setup({
    options,
    defaultValue
  })
  //test button defaults to value
  const text = utils.container.querySelector('span.text')
  expect(text).toHaveTextContent(options[1].text)

  //test that option in menu shows as selected
  const event = createEvent.click(dropdownBtn)
  fireEvent.click(dropdownBtn, event)
  const selected = utils.container.querySelector(
    'li.dropdown-menu-item-container.selected'
  )
  expect(selected).toHaveTextContent(options[1].text)
})

test('test setting to disabled', async () => {
  const { dropdown, dropdownBtn, utils, props } = await setup({
    options,
    disabled: true,
    label: 'testlabel'
  })

  const label = utils.getByText(props?.label)
  expect(dropdown).toHaveClass('disabled')
  expect(dropdownBtn).toHaveAttribute('disabled')
  expect(label.parentElement).toHaveClass('disabled')
})

test('test setting error for dropdown', async () => {
  const { dropdown } = await setup({
    options,
    error: true
  })
  expect(dropdown).toHaveClass('error')
})

test('test setting fluid for dropdown', async () => {
  const { dropdown } = await setup({
    options,
    fluid: true
  })
  expect(dropdown).toHaveClass('fluid')
})

test('test passing label for dropdown', async () => {
  const { props, utils } = await setup({
    options,
    label: 'testlabel'
  })
  const label: Element = utils.getByText(props?.label)
  expect(label).toBeInTheDocument()
  expect(label.parentElement).toHaveClass('input-label')
})

test('test passing loading dropdown', async () => {
  const { dropdown, utils } = await setup({
    options,
    loading: true
  })
  const loading: Element = utils.container.querySelector('div.icon.loading')
  expect(loading).toBeInTheDocument()
  expect(dropdown).toHaveClass('loading')
})

test('test setting inline for dropdown', async () => {
  const { dropdown } = await setup({
    options,
    inline: true
  })
  expect(dropdown).toHaveClass('inline')
})

test('test setting placeholder for dropdown', async () => {
  const { props, utils, dropdown } = await setup({
    options,
    placeholder: 'placeholder'
  })
  const text = utils.getByText(props?.placeholder)

  expect(text).toBeInTheDocument()
  expect(dropdown).toHaveClass('placeholder')
  expect(text).toHaveTextContent(props?.placeholder as string)
})

test('test setting required for dropdown', async () => {
  const { dropdown, props, utils } = await setup({
    options,
    label: 'testlabel',
    required: true
  })
  const label = utils.getByText(props?.label)

  expect(label).toBeInTheDocument()
  expect(dropdown).toHaveClass('required')
  expect(label.parentElement).toHaveClass('required')
})
