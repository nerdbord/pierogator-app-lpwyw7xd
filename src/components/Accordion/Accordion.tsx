import React, { PropsWithChildren, useState } from 'react'
import styles from './Accordion.module.scss'
import { Arrow } from '../../assets/icons/Arrow/Arrow'

interface AccordionSection {
    title: string;
    items: string[];
  }

interface AccordionProps {
  header: string
  sections: AccordionSection[]
}

export const Accordion = ({
  header,
  sections,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

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
      {isOpen && sections.map((section, index) => (
        <div key={index} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <ul className={styles.sectionItems}>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}