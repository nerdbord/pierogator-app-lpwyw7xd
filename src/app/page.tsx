'use client'
import styles from './page.module.scss'
import TextField from '@/compontents/TextField/TextField'
import { Unlock } from '../assets/icons/Unlock/Unlock'
import { Lock } from '../assets/icons/Lock/Lock'
export default function Home() {
  return (
    <div className={styles.container}>
      <h1>PIEROGATOR MORDO</h1>
      <TextField
        onChange={() => console.log('huj')}
        // iconState="none"    <-------
        placeholder="wegańskie ciasto na pszennej mące uniwersalnej"
        label="Ciasto"
      />
    </div>
  )
}
