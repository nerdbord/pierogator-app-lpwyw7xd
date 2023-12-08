import styles from './Lock.module.scss'

export const Lock = () => {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <rect
          x="3.75"
          y="8.25"
          width="10.5"
          height="7.5"
          rx="1"
          stroke="#002902"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.25 6C5.25 3.92893 6.92893 2.25 9 2.25V2.25C11.0711 2.25 12.75 3.92893 12.75 6V8.25H5.25V6Z"
          stroke="#002902"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  )
}
