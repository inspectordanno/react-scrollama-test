import React from 'react'
import styles from './Text.module.css'

const Text = ({ text }) => {

  return (
    <div className={styles.text}>
      {text}
    </div>
  )
}

export default Text