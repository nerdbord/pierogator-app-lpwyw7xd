'use client'
import React, { ChangeEventHandler, useState } from 'react'
import styles from './TextFieldSingle.module.scss'

interface TextFieldProps {
  id?: string
  name?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  value?: string
  disabled?: boolean
}

export const TextField = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  value,
  disabled
}: TextFieldProps) => {


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
        />
      </div>
    </div>
  )
}

export default TextField
