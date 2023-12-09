'use client'
import React, { useState } from 'react'
import TextField from '@/components/TextField/TextField'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import styles from './page.module.scss'
import GenerateDumplingImage from '@/components/Sections/GenerateDumplingImage/GenerateDumplingImage'

const Dumpligator = () => {
  const [dough, setDough] = useState('')
  const [filling, setFilling] = useState('')
  const [ingredients, setIngredients] = useState('')
  const { tmp, setTmp } = useDumplingStore()

  const generateSingleIngredient = async (prompt: string, setState: any) => {
    try {
      const response = await fetch(
        'https://training.nerdbord.io/api/v1/openai/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
            ],
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Response from GPT:', data)

      if (data.choices && data.choices[0]) {
        setState(data.choices[0].message.content)
      }
    } catch (error) {
      console.error('Error during GPT fetch:', error)
    }
  }

  const generateIngredients = async () => {
    if (!dough) {
      generateSingleIngredient(
        'podaj losowy opis ciasta na pierogi, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od `oto losowe ciasto blablabla tylko podaj po prostu opis ciasta`',
        setDough,
      )
    }
    if (!filling) {
      generateSingleIngredient(
        'podaj jakieś losowe nadzienie do pierogów , nie pisz nic więcej i nie zaczynaj zdania od `oto losowe nadzienie do pierogów blablabla tylko podaj po prostu nadzienie`',
        setFilling,
      )
    }
    if (!ingredients) {
      generateSingleIngredient(
        'podaj składniki które są potrzebne do zrobienia tych pierogów z podanym wyżej ciastem i nadzieniem, nie pisz nic więcej i nie zaczynaj zdania od `oto składniki` tylko po prostu je podaj',
        setIngredients,
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Składniki</SectionHeader>
        <div className={styles.buttonWrapper}>
          {tmp && <Loader />}
          <Button onClick={generateIngredients}>Generuj</Button>
        </div>
      </div>
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Ciasto"
        onChange={(e) => setDough(e.target.value)}
        value={dough}
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Nadzienie"
        onChange={(e) => setFilling(e.target.value)}
        value={filling}
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Składniki"
        onChange={(e) => setIngredients(e.target.value)}
        value={ingredients}
      />

      {/* Generate dumpling image and name */}
      <GenerateDumplingImage
        ingredients={ingredients}
        dough={dough}
        filling={filling}
      />
    </div>
  )
}

export default Dumpligator
