import React from 'react'
import styles from './search.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { setInputValue } from '../../redux/slices/filterSlice.js'

import debounce from 'lodash.debounce'

const Search = () => {
    const [localSearchValue, setLocalValue] = React.useState('')

    // React.useRef() для фокуса на какой то элемент в DOM
    const inputRef = React.useRef();
    // 

    // вытаскивае и передавча данных в Redux
    const dispatch = useDispatch();
    // 

    const onClearButton = () => {
        dispatch(setInputValue(''));
        setLocalValue('');
        inputRef.current.focus();

        // console.log("cтерлось всё из локального стейта", localSearchValue);
    }

    // useCallback получает ссылку на функцию и зависимости [] с помощью которых он ее вызывает.
    // при первом рендере создаст и вернет функцию и поместит debounceTime. [] с помощью скобок сказали не пересоздавай, создай 1 раз
    // debounce помогает сделать отложенную функцию.
    const debounceTime = React.useCallback(
        debounce((str) => {
            dispatch(setInputValue(str));
        }, 1000), []
    )
    // ввел запрос => прошла 1 секунд => ушёл запрос на back-end => пришёл ответ => прогрузились нужные пиццы

    const onChangeInput = (e) => {
        setLocalValue(e.target.value);
        debounceTime(e.target.value);

        // console.log('записано в локальный state search component', localSearchValue)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.iconSearch} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" fill="#6563ff" />
            </svg>
            <input ref={inputRef} value={localSearchValue} onChange={(event) => onChangeInput(event)} placeholder='поиск пицц..' className={styles.input} />
            {
                localSearchValue == '' ? '' : <svg className={styles.iconClear} onClick={onClearButton}
                    data-name="Layer 1" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title /><path d="M21.32,2.1A3.35,3.35,0,0,0,18.78,1H5.22A3.35,3.35,0,0,0,2.68,2.1,2.66,2.66,0,0,0,2,4.2L4.17,20.47A3.13,3.13,0,0,0,7.37,23h9.26a3.13,3.13,0,0,0,3.2-2.53L22,4.2A2.66,2.66,0,0,0,21.32,2.1ZM17.84,20.21c-.05.44-.6.79-1.21.79H7.37c-.61,0-1.16-.35-1.21-.79L4,3.94a.65.65,0,0,1,.18-.52,1.4,1.4,0,0,1,1-.42H18.78a1.4,1.4,0,0,1,1,.42.65.65,0,0,1,.18.52Z" /><path d="M7.36,5a1,1,0,0,0-.91,1.08l1,12a1,1,0,0,0,1,.92h.08a1,1,0,0,0,.92-1.08l-1-12A1,1,0,0,0,7.36,5Z" /><path d="M12,5a1,1,0,0,0-1,1V18a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z" /><path d="M16.51,4.9a1,1,0,0,0-1.08.91l-1,12a1,1,0,0,0,.91,1.08h.09a1,1,0,0,0,1-.92l1-12A1,1,0,0,0,16.51,4.9Z" /></svg>
            }

        </div>
    )
}

// чтобы работал INPUT надо:
// <input (1)value={inputValue} (2)onChange={(event) => setValue(event.target.value)}/>
// 1 - value поместить значения состояния input
// 2 - onChange - делаем анонимную функцию и помещаем туда свойство которое изменяет состояние setValue
// setValue(event.target.value) - и вытаскиваем значение
// таким образом INPUT становиться подкотрольным REACTy


export default Search;