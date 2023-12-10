'use client'
import React, { ChangeEventHandler, useRef } from 'react'
import styles from './TextFieldSingle.module.scss'

interface TextFieldProps {
  id?: string
  name?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  value?: string
  disabled?: boolean
  maxLength?: number
}

export const TextField = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  value,
  disabled,
  maxLength = undefined,
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
          ref={inputRef}
        />
      </div>
      {maxLength &&
        inputRef.current &&
        inputRef.current.value.length >= maxLength && (
          <span className={styles.errorMsg}>Osiągnięto limit 40 znaków.</span>
        )}
    </div>
  )
}

export default TextField
