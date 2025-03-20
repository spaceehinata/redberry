import React from 'react'
import styles from './Header.module.scss'
import Button2 from '../Buttons/Button2/Button2'
import Button3 from '../Buttons/Button3/Button3'
type Props = {}

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
        <div className={styles.momentum}>
        Momentum <img src="/asserts/Hourglass.svg" alt="" />
        </div>
        <div className={styles.buttons}>
            <Button2 />
            <Button3 />
        </div>
  </header>
  )
}

export default Header