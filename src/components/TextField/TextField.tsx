'use client'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
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
  value?: string
  locked?: boolean
  onLockChange?: (locked: boolean) => void
}

export const TextField = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  iconState = 'unlock',
  value,
  locked,
  onLockChange,
}: TextFieldProps) => {
  const [currentIconState, setCurrentIconState] = useState(
    locked ? 'lock' : 'unlock',
  )
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCurrentIconState(locked ? 'lock' : 'unlock')
    adjustHeight()
  }, [locked])

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    adjustHeight()
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const toggleIcon = () => {
    const newState = currentIconState === 'unlock' ? 'lock' : 'unlock'
    setCurrentIconState(newState)
    if (onLockChange) {
      onLockChange(newState === 'lock')
    }
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
          ref={textareaRef}
          className={styles.input}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={currentIconState === 'lock'}
          onChange={handleOnChange}
          value={value}
        />
      </div>
    </div>
  )
}

export default TextField
