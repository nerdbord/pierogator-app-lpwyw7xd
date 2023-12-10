import React from 'react'
import styles from './Close.module.scss'

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  white?: boolean
}

function Close({ white = false, onClick }: Props) {
  return (
    <div className={styles.close}>
      <svg
        width="15"
        height="16"
        viewBox="0 0 9 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.60156 7.64844C8.95703 7.97656 8.95703 8.55078 8.60156 8.87891C8.4375 9.04297 8.21875 9.125 8 9.125C7.75391 9.125 7.53516 9.04297 7.37109 8.87891L4.5 6.00781L1.60156 8.87891C1.4375 9.04297 1.21875 9.125 1 9.125C0.753906 9.125 0.535156 9.04297 0.371094 8.87891C0.015625 8.55078 0.015625 7.97656 0.371094 7.64844L3.24219 4.75L0.371094 1.87891C0.015625 1.55078 0.015625 0.976562 0.371094 0.648438C0.699219 0.292969 1.27344 0.292969 1.60156 0.648438L4.5 3.51953L7.37109 0.648438C7.69922 0.292969 8.27344 0.292969 8.60156 0.648438C8.95703 0.976562 8.95703 1.55078 8.60156 1.87891L5.73047 4.77734L8.60156 7.64844Z"
          fill={white ? '#FFF' : '#002902'}
        />
      </svg>
    </div>
  )
}

export default Close
