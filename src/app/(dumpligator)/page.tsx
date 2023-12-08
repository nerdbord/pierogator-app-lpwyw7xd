'use client'
import React from 'react'
import TextField from '@/components/TextField/TextField'
import { Unlock } from '../../assets/icons/Unlock/Unlock'
import { Lock } from '../../assets/icons/Lock/Lock'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'

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
    </div>
  )
}

export default Dumpligator
