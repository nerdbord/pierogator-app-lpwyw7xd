'use client'
import React from 'react'
import TextField from '@/components/TextField/TextField'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/Card/Card'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'

const Dumpligator = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/createdumpling')
  };
  const { tmp, setTmp } = useDumplingStore()
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Składniki</SectionHeader>
        <div className={styles.buttonWrapper}>
          {tmp && <Loader />}
          <Button onClick={() => setTmp(!tmp)}>Generuj</Button>
        </div>
      </div>
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Ciasto"
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Nadzienie"
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Składniki"
      />
      <div className={styles.headerWrapper}>
        <SectionHeader>Pieróg</SectionHeader>
        <div className={styles.buttonWrapper}>
          {tmp && <Loader />}
          <Button onClick={() => setTmp(!tmp)}>Generuj</Button>
        </div>
      </div>
      {tmp && (
        <>
          <Card
            item={{
              name: '',
              img: 'https://i.imgur.com/Odcmv1g.png',
              url: 'www.url-do-pieroga.ru',
            }}
          />
          <TextFieldSingle
            label="Nazwa"
            value="Piróg Piroga"
          />
          <Button variant="action" onClick={handleNavigate }>
            Zapisz i przejdź do tworzenia przepisu
          </Button>
        </>
      )}
    </div>
  )
}

export default Dumpligator
