import React, { ReactElement } from 'react'
import Stack, { StackProps } from '../layout/Stack'

export type ButtonListProps = StackProps
export function ButtonList(props: StackProps): ReactElement {
  return <Stack {...props} />
}

export { JustifyContent } from '../layout/Stack'
export default ButtonList
