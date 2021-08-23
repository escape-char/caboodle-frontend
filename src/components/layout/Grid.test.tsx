/**
 * tests for grid component
 */

import React from 'react'
import { render } from '@testing-library/react'
import Grid, { GridColumn, GridRow } from './Grid'
import { OnlyDevice, Spacing } from '../types/components'

test('test rendering of Grid without props', () => {
  const { container } = render(
    <Grid>
      <GridRow>
        <GridColumn>col1</GridColumn>
        <GridColumn>col2</GridColumn>
      </GridRow>
    </Grid>
  )
  const grid: HTMLElement | null = container.querySelector('div.container.grid')
  const row: ChildNode | null | undefined = grid?.firstChild
  const col: ChildNode | null | undefined = row?.firstChild

  expect(grid).toHaveClass('container', 'grid')
  expect(row).toHaveClass('container', 'row')
  expect(col).toHaveClass('container', 'col', 'col16')
})

test('test passing column widths', () => {
  const { container } = render(
    <Grid>
      <GridRow>
        <GridColumn width={4}>col1</GridColumn>
        <GridColumn width={12}> col2</GridColumn>
      </GridRow>
    </Grid>
  )
  const row: HTMLElement | null = container.querySelector('div.container.row')
  const col = row?.firstChild

  expect(col).toHaveClass('container', 'col', 'col4')
  expect(col?.nextSibling).toHaveClass('container', 'col', 'col12')
})

test('test passing mobile and tablet sizes', () => {
  const { container } = render(
    <Grid>
      <GridRow>
        <GridColumn mobile={16}>col1</GridColumn>
        <GridColumn tablet={12}> col2</GridColumn>
      </GridRow>
    </Grid>
  )
  const row: HTMLElement | null = container.querySelector('div.container.row')
  const col = row?.firstChild

  expect(col).toHaveClass('container', 'col', 'mobile-col16')
  expect(col?.nextSibling).toHaveClass('container', 'col', 'tablet-col12')
})

test('test passing monitor sizes', () => {
  const { container } = render(
    <Grid>
      <GridRow>
        <GridColumn smallMonitor={6}>col1</GridColumn>
        <GridColumn largeMonitor={10}> col2</GridColumn>
        <GridColumn wideMonitor={16}> col3</GridColumn>
      </GridRow>
    </Grid>
  )
  const row: HTMLElement | null = container.querySelector('div.container.row')
  const col = row?.firstChild

  expect(col).toHaveClass('container', 'col', 'small-mon-col6')
  expect(col?.nextSibling).toHaveClass('container', 'col', 'large-mon-col10')
  expect(col?.nextSibling?.nextSibling).toHaveClass(
    'container',
    'col',
    'wide-mon-col16'
  )
})

test('test passing only devices', () => {
  const { container } = render(
    <Grid>
      <GridRow>
        <GridColumn only={OnlyDevice.MobileOnly}>col1</GridColumn>
        <GridColumn only={OnlyDevice.LargeMonitorOrLowerHidden}>
          col2
        </GridColumn>
        <GridColumn only={OnlyDevice.TabletOnly}> col3</GridColumn>
      </GridRow>
    </Grid>
  )
  const row: HTMLElement | null = container.querySelector('div.container.row')
  const col = row?.firstChild

  expect(col).toHaveClass('container', 'col', 'mobile-only')
  expect(col?.nextSibling).toHaveClass(
    'container',
    'col',
    'large-mon-lower-hidden'
  )
  expect(col?.nextSibling?.nextSibling).toHaveClass(
    'container',
    'col',
    'tablet-only'
  )
})

test('test passing style and class names', () => {
  const className = 'testclassname'
  const style = { color: 'red' }
  const { container } = render(
    <Grid className={className} style={style}>
      <GridRow className={className} style={style}>
        <GridColumn className={className} style={style}>
          col1
        </GridColumn>
      </GridRow>
    </Grid>
  )
  const grid = container.querySelector('div.container.grid')
  const row: ChildNode | null = container.firstChild

  expect(grid).toHaveClass(className)
  expect(grid).toHaveStyle(style)

  expect(row).toHaveClass(className)
  expect(row).toHaveStyle(style)

  expect(row?.firstChild).toHaveClass(className)
  expect(row?.firstChild).toHaveStyle(style)
})

test('test passing padding and gap', () => {
  const { container } = render(
    <Grid padding={Spacing.Medium} gap={Spacing.Large}></Grid>
  )
  const grid = container.querySelector('div.container.grid')
  expect(grid).toHaveStyle({ padding: `16px`, gap: '24px' })
})
