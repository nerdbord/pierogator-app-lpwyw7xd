import React, { PropsWithChildren } from 'react'
import styles from './SectionHeader.module.scss'
import Dumpling from '../../assets/icons/Dumpling/Dumpling'

export const SectionHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.header}>
      <Dumpling />
      <h2 className="h2">{children}</h2>
    </div>
  )
}
