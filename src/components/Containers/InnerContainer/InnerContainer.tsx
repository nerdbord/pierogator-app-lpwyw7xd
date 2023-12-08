import React, { PropsWithChildren } from 'react'
import styles from './InnerContainer.module.scss'

const InnerContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.innerContainer}>{children}</div>
}

export default InnerContainer
