'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/Card/Card'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { Accordion } from '@/components/Accordion/Accordion'
import BigImage from '@/components/BigImage/BigImage'

const Dumpling = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <Button onClick={handleBackClick}>Wróć</Button>
        <SectionHeader>Pieróg</SectionHeader>
      </div>
      <div className={styles.myDumplingsContainer}>
        <BigImage src={'https://i.imgur.com/Odcmv1g.png'} />
        <TextFieldSingle value="Pierożyn" disabled={true} />
      </div>
      <div className={styles.headerWrapperFlexEnd}>
        <SectionHeader>Przepis</SectionHeader>
      </div>
      <div className={styles.accordionsWrapper}>
        <Accordion header={'Składniki'} isAccordionOpen={false}/>
        <Accordion header={'Przygotowanie'} isAccordionOpen={false}/>
        <Accordion header={'Podawanie'} isAccordionOpen={false}/>
      </div>
    </div>
  )
}

export default Dumpling
