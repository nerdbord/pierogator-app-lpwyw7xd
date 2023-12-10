'use client'

import React from 'react'
import useDumplingStore from '@/store/useDumplingStore'
import styles from './Toast.module.scss'
import Close from '@/assets/icons/Close/Close'

function Toast() {
  const { toast, setToast } = useDumplingStore()

  if (toast) {
    setTimeout(() => {
      setToast(null)
    }, 6000)

    return (
      <div
        className={`${styles.toast} ${
          toast.variant == 'error' ? styles.error : styles.success
        }`}
        onClick={() => setToast(null)}
      >
        {toast.msg}
        <Close
          onClick={() => setToast(null)}
          white={toast.variant == 'error' ? true : false}
        />
      </div>
    )
  }

  return null
}

export default Toast
