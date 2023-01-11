import { PropsWithChildren } from 'react'
import styles from './CustomCard.module.css'

export default function CustomCard(props: PropsWithChildren<object>) {
  return <div className={styles.container}>{props.children}</div>
}
