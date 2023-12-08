'use client'
import React, { ChangeEventHandler, useState } from 'react'
import styles from './TextField.module.scss'
import { Lock } from '@/assets/icons/Lock/Lock'
import { Unlock } from '@/assets/icons/Unlock/Unlock'

interface TextFieldProps {
  id?: string
  name?: string
  placeholder?: string
  iconState?: 'none' | 'lock' | 'unlock'
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  label?: string
}

export const TextField = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  iconState = 'unlock',
}: TextFieldProps) => {
  const [currentIconState, setCurrentIconState] = useState(iconState)

  const toggleIcon = () => {
    setCurrentIconState((prevState) =>
      prevState === 'unlock' ? 'lock' : 'unlock',
    )
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {currentIconState !== 'none' && (
          <span className={styles.icon} onClick={toggleIcon}>
            {currentIconState === 'lock' ? <Lock /> : <Unlock />}
          </span>
        )}
        <textarea
          className={styles.input}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={currentIconState === 'lock'}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default TextField
