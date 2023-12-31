import styles from './Unlock.module.scss'

export const Unlock = () => {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M12.75 8.24998V4.51581C12.75 2.51378 11.127 0.890807 9.125 0.890807H9.00917C7.07111 0.890807 5.41095 2.45944 5.25 4.39081V4.39081"
          stroke="#002902"
          strokeLinecap="round"
        />
        <rect
          x="3.75"
          y="8.25"
          width="10.5"
          height="7.5"
          rx="1"
          stroke="#002902"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
