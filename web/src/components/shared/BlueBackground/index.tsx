import styles from "./styles.module.css"

interface Props {
  children: React.ReactNode
}

export default function BlueBackground({ children }: Props) {
  return (
    <div className={styles.main}>
      {children}
    </div>
  )
}