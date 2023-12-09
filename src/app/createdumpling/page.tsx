'use client'
import React, { useEffect } from 'react'
import TextField from '@/components/TextField/TextField'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import { Accordion } from '@/components/Accordion/Accordion'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
const skladniki = [
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

const przygotowanie = [
  {
    title: 'Ciasto',
    items: [
      '1. W misce wymieszaj mąkę z solą. Dodaj olej i stopniowo wlewaj ciepłą wodę, mieszając do uzyskania jednolitej konsystencji.',
      '2. Wyłóż ciasto na stolnicę i wyrób dokładnie około 5 minut, aż będzie gładkie i elastyczne.',
      '3. Odkryj ciasto ściereczką i pozostaw na około 30 minut.',
    ],
  },
  {
    title: 'Farsz',
    items: [
      '1. Przygotowanie grzybów: Grzyby namocz w ciepłej wodzie na około 20 minut, następnie ocedź i drobno posiekaj.',
      '2. Pokrój cebulę: Na patelni rozgrzej olej, dodaj drobno posiekaną cebulę i smaż do zeszklenia.',
      '3. Dokładnie grzyby: Do cebuli dodaj grzyby i smaż wszystko razem przez kilka minut.',
      '4. Dodaj kapustę: Do patelni z cebulą, przypraw solą i pieprzem, a następnie dusz wszystko razem przez około 20 minut. Ostudź do ostygnięcia.',
    ],
  },
  {
    title: 'Formowanie i gotowanie pierogów',
    items: [
      '1. Rozwałkowanie ciasta: Rozwałkuj ciasto na cienki placek, a następnie wykrawaj kręgi przy pomocy szklanki.',
      '2. Nadziewanie pierogów: Na każdy krąg nakładaj łyżeczkę farszu, zlepij brzegi formując pierogi.',
      '3. Gotowanie pierogów: W dużym garnku zagotuj wodę z solą. Wrzuć partiami pierogi i gotuj do ich wypłynięcia, po czym pozostaw na powierzchni wody, co oznaczać zwykle około 3-5 minut.',
      '4. Wyjmowanie pierogów: Wyjmij pierogi łyżką cedzakową i odsącz z wody.',
    ],
  },
]

const podawanie = [
  {
    title: '',
    items: [
      'Podawaj pierogi na ciepło, opcjonalnie możesz je polać roztopionym masłem lub zrumienić na patelni dla chrupiącej skórki.',
    ],
  },
]
import { Card } from '@/components/Card/Card'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'

const Dumpligator = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }
  const { tmp, setTmp } = useDumplingStore()
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
      />
      <div className={styles.dumlingNameWrapper}>
        <TextFieldSingle value="Piróg Piroga" disabled={true} /> 
      </div>
      <div className={styles.headerWrapper}>
        <SectionHeader>Przepis</SectionHeader>
        <div className={styles.buttonWrapper}>
          {tmp && <Loader />}
          <Button onClick={() => setTmp(!tmp)}>Generuj</Button>
        </div>
      </div>
      <TextField
        label="Uwagi do przepisu"
        placeholder="chrupiące pierogi bez pieczenia, bez użycia miksera"
        iconState="none"
      />
      <div className={styles.accordionsWrapper}>
        <Accordion header={'Składniki'} sections={skladniki} />
        <Accordion header={'Przygotowanie'} sections={przygotowanie} />
        <Accordion header={'Podawanie'} sections={podawanie} />
      </div>
      <Button variant="action" onClick={() => console.log('huj')}>
            Udostępnij pieroga
          </Button>
    </div>
  )
}

export default Dumpligator
