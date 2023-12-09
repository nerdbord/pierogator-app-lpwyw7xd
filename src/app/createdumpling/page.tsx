'use client'
import React from 'react'
import TextField from '@/components/TextField/TextField'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import { Accordion } from '@/components/Accordion/Accordion'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/Card/Card'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { podawanie, przygotowanie, skladniki } from '@/fakeData/fakeData'

const CreateDumpling = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }
  const handleNavigate = () => {
    router.push('/dumplinghub')
  };


  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Pieróg</SectionHeader>
        <Button onClick={handleBackClick}>Zmień</Button>
      </div>
      <Card
        item={{
          name: '',
          img: 'https://i.imgur.com/Odcmv1g.png',
          url: 'www.url-do-pieroga.ru',
        }}
        imageSize='big'
      />
      <div className={styles.dumlingNameWrapper}>
        <TextFieldSingle value="Piróg Piroga" disabled={true} /> 
      </div>
      <div className={styles.headerWrapper}>
        <SectionHeader>Przepis</SectionHeader>
        <div className={styles.buttonWrapper}>
          {/* {tmp && <Loader />} */}
          <Button onClick={() => console.log('yumyum')}>Generuj</Button>
        </div>
      </div>
      <TextField
        label="Uwagi do przepisu"
        placeholder="chrupiące pierogi bez pieczenia, bez użycia miksera"
        iconState="none"
        onChange={() => console.log('yumyum')}
      />
      <div className={styles.accordionsWrapper}>
        <Accordion header={'Składniki'} sections={skladniki} />
        <Accordion header={'Przygotowanie'} sections={przygotowanie} />
        <Accordion header={'Podawanie'} sections={podawanie} />
      </div>
      <Button variant="action" onClick={handleNavigate}>
            Udostępnij pieroga
          </Button>
    </div>
  )
}

export default CreateDumpling
