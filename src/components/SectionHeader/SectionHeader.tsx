import React, { PropsWithChildren } from 'react'
import styles from './SectionHeader.module.scss'
import Dumpling from '../icons/Dumpling'

export const SectionHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.header}>
      <Dumpling />
      <h2>{children}</h2>
    </div>
  )
}
