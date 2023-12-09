'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/Card/Card'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { Accordion } from '@/components/Accordion/Accordion'
import { podawanie, przygotowanie, skladniki } from '@/fakeData/fakeData'

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
        <Card
          item={{
            name: '',
            img: 'https://i.imgur.com/Odcmv1g.png',
            url: 'www.url-do-pieroga.ru',
          }}
          imageSize="big"
        />
        <TextFieldSingle value="Pierożyn" disabled={true} />
      </div>
      <div className={styles.headerWrapperFlexEnd}>
        <SectionHeader>Przepis</SectionHeader>
      </div>
      <div className={styles.accordionsWrapper}>
        <Accordion header={'Składniki'} sections={skladniki} />
        <Accordion header={'Przygotowanie'} sections={przygotowanie} />
        <Accordion header={'Podawanie'} sections={podawanie} />
      </div>
    </div>
  )
}

export default Dumpling
