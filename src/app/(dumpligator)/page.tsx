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
const sections = [
  {
    title: 'Ciasto',
    items: [
      '2 szklanki mąki pszennej',
      '1/2 szklanki ciepłej wody',
      '1 łyżka oleju',
      'Szczypta soli',
    ],
  },
  {
    title: 'Farsz',
    items: [
      '2 szklanki kiszonej kapusty',
      '1 szklanka suszonych grzybów (np. borowiki, podgrzybki)',
      '1 cebula',
      '2 łyżki oleju',
      'Sól, pieprz do smaku',
    ],
  },
]
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
      {/* <Button onClick={() => setTmp(!tmp)}>Generuj</Button>)}
      <Button variant="action">Zapisz i przejdź do tworzenia przepisu</Button>
      <Accordion header={'Składniki'} sections={sections} />
      <Card
        item={{
          name: 'Piróg',
          img: 'https://i.imgur.com/Odcmv1g.png',
          url: 'www.url-do-pieroga.ru',
        }}
        withActions
      /> */}
    </div>
  )
}

export default Dumpligator
