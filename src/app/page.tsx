'use client'
import styles from './page.module.scss'
import TextField from '@/compontents/TextField/TextField'
import { Unlock } from '../assets/icons/Unlock/Unlock'
import { Lock } from '../assets/icons/Lock/Lock'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
export default function Home() {
  const { tmp, setTmp } = useDumplingStore()
  return (
    <div className={styles.container}>
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
