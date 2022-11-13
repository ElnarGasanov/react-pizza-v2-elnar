import React from 'react'
import { Link } from 'react-router-dom';

import styles from './NotFoundBlock.module.scss';
// scss module.scss так можно передавать scss стили

const NotFoundInfo = () => {
    return (
        <>
            <h1 className={styles.root}>
                <span>:((</span>
                <br />
                Ничего не найдено
            </h1>
            <Link to='/'>
                <button className={styles.button}>Назад на главную</button>
            </Link>
        </>
    )
}

export default NotFoundInfo