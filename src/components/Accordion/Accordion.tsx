'use client'
import React, { useEffect, useState } from 'react'
import styles from './Accordion.module.scss'
import { Arrow } from '../../assets/icons/Arrow/Arrow'
import { Ingredient } from '@/types/types'

interface AccordionProps {
  header: string
  sections: React.JSX.Element[]
  isAccordionOpen: boolean
}

export const Accordion = ({
  header,
  sections,
  isAccordionOpen,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isAccordionOpen !== undefined) {
      setIsOpen(isAccordionOpen)
    }
  }, [isAccordionOpen])

  const handleSwitch = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleSwitch}>
        <span>{header}:</span>
        <span className={isOpen ? styles.arrowDown : ''}>
          <Arrow />
        </span>
      </div>
      {isOpen &&
        sections.map((section, index) => (
          <div key={index} className={styles.section}>
            {section}
          </div>
        ))}
    </div>
  )
}
