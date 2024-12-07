import React from 'react'
import ScaleText from 'react-scale-text'
import styles from './error-placeholder.module.css'

export const ErrorPlaceholder: React.FC = () => {
  return (
    <div className={styles.widget}>
      <div>
        <ScaleText maxFontSize={36}>We are unable to display this component. Please contact customer support</ScaleText>
      </div>
    </div>
  )
}
