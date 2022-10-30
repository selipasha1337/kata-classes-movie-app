import { Component } from 'react'

import styles from './Container.module.css'

class Container extends Component {
  render() {
    const { children } = this.props

    return <div className={styles.container}>{children}</div>
  }
}

export default Container
