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
  const { tmp, dumplingBase } = useDumplingStore()
  const [dough, setDough] = useState(dumplingBase.dough)
  const [filling, setFilling] = useState(dumplingBase.filling)
  const [ingredients, setIngredients] = useState(dumplingBase.ingredients)
  const [isDoughLocked, setIsDoughLocked] = useState(false)
  const [isFillingLocked, setIsFillingLocked] = useState(false)
  const [isIngredientsLocked, setIsIngredientsLocked] = useState(false)
  

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
    if (!isDoughLocked) {
      generateSingleIngredient(
        `podaj losowy opis ciasta na pierogi, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od "oto losowe ciasto blablabla" tylko podaj po prostu opis ciasta. opis ma być krótki np. "cienkie, elastyczne ciasto, klasyczny polski przepis z jajkami". tylko nie pisz z jakich składników`,
        setDough,
      )
    }
    if (!isFillingLocked) {
      generateSingleIngredient(
        `podaj losowy opis nadzienia do pierogów, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od "oto losowe nadzienie blablabla" tylko podaj po prostu krótki opis nadzienia. opis ma być krótki np. "aksamitne tradycyjne wytrawne nadzienie". tylko nie pisz z jakich składników.`,
        setFilling,
      )
    }
    if (!isIngredientsLocked) {
      generateSingleIngredient(
        `podaj losowy opis składników do pierogów, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od "oto losowe składniki blablabla" tylko podaj po prostu krótkie składniki. opis ma być krótki np. "cebula, feta, szpinak"`,
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
        locked={isDoughLocked}
        onLockChange={setIsDoughLocked}
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Nadzienie"
        onChange={(e) => setFilling(e.target.value)}
        value={filling}
        locked={isFillingLocked}
        onLockChange={setIsFillingLocked}
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Składniki"
        onChange={(e) => setIngredients(e.target.value)}
        value={ingredients}
        locked={isIngredientsLocked}
        onLockChange={setIsIngredientsLocked}
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
