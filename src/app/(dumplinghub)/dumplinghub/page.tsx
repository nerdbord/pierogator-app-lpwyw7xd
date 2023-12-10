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
import useDumplingStore from '@/store/useDumplingStore'
import NavigateButton from '@/components/NavigateButton/NavigateButton'
import { AppRoutes } from '@/utils/routes'
import Loader from '@/components/Loader/Loader'

const Dumplinghub = () => {
  const router = useRouter()
  const { refreshList, setToast } = useDumplingStore()
  const [isPending, startTransition] = useTransition()
  const [myDumplings, setMyDumplings] = useState<null | []>(null)
  const [publicDumplings, setPublicDumplings] =
    useState<null | Array<DumplingRecipe>>(null)

  const openDumpling = (id: string | undefined) => {
    id && router.push(`${AppRoutes.dumpling}/${id}`)
  }

  useEffect(() => {
    getAllDumplings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshList])

  const getAllDumplings = () => {
    startTransition(async () => {
      try {
        console.log('Loading dumplings')
        setPublicDumplings(await getPublicDumplings())
        setMyDumplings(await getMyDumplings())
      } catch (error) {
        console.error('Error getting public dumplings:', error)
        setToast({ variant: 'error', msg: 'Ups! Coś poszło nie tak 😳' })
      }
    })
  }

  return (
    <div className={styles.container}>
      {/* My dumplings */}
      <div className={styles.headerWrapper}>
        <SectionHeader>Moje pierogi</SectionHeader>
        <NavigateButton url={AppRoutes.home}>Nowy pieróg</NavigateButton>
      </div>
      <div className={styles.myDumplingsContainer}>
        {myDumplings ? (
          <>
            {myDumplings.map((card, index) => (
              <Card key={index} item={card} imageSize="small" withActions />
            ))}
          </>
        ) : (
          <div className={styles.loader}>
            <Loader />
            Ładuje pierożki..
          </div>
        )}
      </div>

      {/* Public dumplings - PIEROGARNIA */}
      <div className={styles.headerWrapper}>
        <SectionHeader>Pierogarnia</SectionHeader>
      </div>
      <div className={styles.myDumplingsContainer}>
        {publicDumplings ? (
          <>
            {publicDumplings.map((card, index) => (
              <div
                key={index}
                onClick={() => openDumpling(card._id)}
                className={styles.publicDumpling}
              >
                <Card item={card} imageSize="small" />
              </div>
            ))}
          </>
        ) : (
          <div className={styles.loader}>
            <Loader />
            Ładuje pierożki..
          </div>
        )}
      </div>
    </div>
  )
}

export default Dumplinghub
