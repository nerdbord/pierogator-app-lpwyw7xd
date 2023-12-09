'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/Card/Card'

const Dumpligator = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/')
  }
  const cardsData = new Array(4).fill(null).map((_, index) => ({
    name: `Pieróg ${index + 1}`,
    img: `https://i.imgur.com/Odcmv1g.png`,
    url: `www.url-do-pieroga-${index + 1}.ru`,
  }));
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Moje pierogi</SectionHeader>
        <Button onClick={handleBackClick}>Nowy pieróg</Button>
      </div>
      <div className={styles.myDumplingsContainer}>
        {cardsData.map((card, index) => (
          <Card
            key={index}
            item={card}
            imageSize="small"
            withActions
          />
        ))}
      </div>
      <div className={styles.headerWrapper}>
        <SectionHeader>Pierogarnia</SectionHeader>
      </div>
      <div className={styles.myDumplingsContainer}>
        {cardsData.map((card, index) => (
          <Card
            key={index}
            item={card}
            imageSize="small"

          />
        ))}
      </div>
    </div>
  )
}

export default Dumpligator
