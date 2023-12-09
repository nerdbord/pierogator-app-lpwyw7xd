'use client'
import React, { useState, useEffect, useTransition } from 'react'
import { Button } from '@/components/Button/Button'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/Card/Card'
import { getPublicDumplings } from '@/services/actions/getPublicDumplings/getPublicDumplings'
import { getMyDumplings } from '@/services/actions/getMyDumplings/getMyDumplings'
import { DumplingRecipe } from '@/types/types'

const Dumplinghub = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [myDumplings, setMyDumplings] = useState<null | []>(null)
  const [publicDumplings, setPublicDumplings] = useState<null | Array<DumplingRecipe>>(null)

  const handleBackClick = () => {
    router.push('/')
  }

  const openDumpling = (id:string | undefined) => {
    id && router.push('/dumpling') //add route to specified dumpling
  }

  useEffect(() => {
    getAllDumplings()
  }, [])

  const getAllDumplings = () => {
    startTransition(async () => {
      try {
        setPublicDumplings(await getPublicDumplings())
        setMyDumplings(await getMyDumplings())
      } catch (error) {
        console.error('Error getting public dumplings:', error)
      }
    })
  }
  return (
    <div className={styles.container}>
      {/* My dumplings */}
      <div className={styles.headerWrapper}>
        <SectionHeader>Moje pierogi</SectionHeader>
        <Button onClick={handleBackClick}>Nowy pieróg</Button>
      </div>
      <div className={styles.myDumplingsContainer}>
        {myDumplings?.map((card, index) => (
          <Card key={index} item={card} imageSize="small" withActions />
        ))}
      </div>

      {/* Public dumplings - PIEROGARNIA */}
      <div className={styles.headerWrapper}>
        <SectionHeader>Pierogarnia</SectionHeader>
      </div>
      <div className={styles.myDumplingsContainer}>
        {publicDumplings ? (
          <>
            {publicDumplings.map((card, index) => (
              <div key={index} onClick={()=>openDumpling(card._id)} className={styles.publicDumpling}>
                <Card item={card} imageSize="small" />
              </div>
            ))}
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

export default Dumplinghub
