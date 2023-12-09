import React, { useState } from 'react'
import styles from './Accordion.module.scss'
import { Arrow } from '../../assets/icons/Arrow/Arrow'

interface AccordionProps {
  header: string
  title1?: string
  item1?: string | React.ReactNode
  title2?: string
  item2?: string | React.ReactNode
  title3?: string
  item3?: string | React.ReactNode
}

export const Accordion = ({
  header,
  title1,
  item1,
  title2,
  item2,
  title3,
  item3,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleSwitch = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleSwitch}>
        <span>{header}</span>
        <span className={isOpen ? styles.arrowDown : ''}>
          <Arrow />
        </span>
      </div>
      {isOpen && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{title1}</h3>
          <ul className={styles.sectionItems}>
            <li>{item1}</li>
          </ul>
          <h3 className={styles.sectionTitle}>{title2}</h3>
          <ul className={styles.sectionItems}>
            <li>{item2}</li>
          </ul>
          <h3 className={styles.sectionTitle}>{title3}</h3>
          <ul className={styles.sectionItems}>
            <li>{item3}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
