import { ReactNode } from 'react'
import CustomLoader from '../custom-loader/CustomLoader'
import styles from './CoverSpinner.module.css'

interface CoverSpinnerProps {
  isLoading: boolean
  errMessage: string
  children?: ReactNode
}

export default function CoverSpinner({
  isLoading,
  errMessage,
  children,
}: CoverSpinnerProps): JSX.Element {
  const isError = errMessage.trim() !== ''

  let spinnerElement: JSX.Element | null = null
  if (isLoading) {
    spinnerElement = (
      <div>
        <CustomLoader size={50} />
      </div>
    )
  }

  if (isError) {
    spinnerElement = <div className={styles.errText}>{errMessage}</div>
  }

  return (
    <div className={styles.coverSpinner}>
      {children}
      {isLoading || isError ? (
        <div className={styles.stackSpinner}>{spinnerElement}</div>
      ) : null}
    </div>
  )
}
