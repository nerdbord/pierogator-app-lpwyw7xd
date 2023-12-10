'use client'

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import styles from './Header.module.scss'
import { useRouter } from 'next/navigation'

const Header = ({ src, alt }: { src: string; alt: string }) => {
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/dumplinghub')
  }
  return (
    <header className={styles.header} onClick={handleNavigate}>
      <img src={src} alt={alt} />
    </header>
  )
}

export default Header
