import React, { ReactElement } from 'react'
import { Container } from './components'
import Input from './components/inputs/Input'
import styles from './App.module.scss'

function App(): ReactElement {
  return (
    <Container fluidWidth className={styles.App}>
      <h1> Testing </h1>
      <Input name="testing" icon="at-sign" />
    </Container>
  )
}

export default App
