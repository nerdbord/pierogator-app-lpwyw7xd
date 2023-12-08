'use client'
import React from 'react'
import TextField from '@/components/TextField/TextField'
import { Unlock } from '../../assets/icons/Unlock/Unlock'
import { Lock } from '../../assets/icons/Lock/Lock'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import { Accordion } from '@/components/Accordion/Accordion'

const sections = [
  {
    title: "Ciasto",
    items: [
      "2 szklanki mąki pszennej",
      "1/2 szklanki ciepłej wody",
      "1 łyżka oleju",
      "Szczypta soli",
    ],
  },
  {
    title: "Farsz",
    items: [
      "2 szklanki kiszonej kapusty",
      "1 szklanka suszonych grzybów (np. borowiki, podgrzybki)",
      "1 cebula",
      "2 łyżki oleju",
      "Sól, pieprz do smaku",
    ],
  },
];

const Dumpligator = () => {
  const { tmp, setTmp } = useDumplingStore()
  return (
    <div>
      <SectionHeader>PIEROGATOR MORDO</SectionHeader>
      <TextField
        onChange={() => console.log('huj')}
        // iconState="none"    <-------
        placeholder="wegańskie ciasto na pszennej mące uniwersalnej"
        label="Ciasto"
      />

      {tmp && <Loader />}
      <Button onClick={() => setTmp(!tmp)}>Generuj</Button>
      <Button variant="action">Zapisz i przejdź do tworzenia przepisu</Button>
      <Accordion header={'Składniki'} sections={sections} />
    </div>
  )
}

export default Dumpligator
