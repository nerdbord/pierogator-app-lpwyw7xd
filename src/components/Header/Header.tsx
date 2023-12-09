import React from 'react'
import Image, { StaticImageData } from 'next/image'
import styles from './Header.module.scss'

const Header = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <header className={styles.header}>
      <img src={src} alt={alt} />
    </header>
  )
}

export default Header
