import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { setSortIndex } from '../redux/slices/filterSlice.js'

export const arrSort = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: '(не)популярности', sortProperty: '-rating' },
  { name: 'дорогие', sortProperty: 'price' },
  { name: 'дешевые', sortProperty: '-price' },
  { name: 'а-я', sortProperty: '-title' },
  { name: 'я-а', sortProperty: 'title' },
]

function Sort() {
  React.useEffect(() => {

    const handleClickOutside = (e) => {
      if(!e.path.includes(sortRef.current)) {
        setOpen(false);
      }
    }

    document.body.addEventListener('click', handleClickOutside, console.log('sort mount'));

    // в React.useEffect если он возращает return то когда компонент удаляется происходит действие в скобках
    return () => {
      console.log('sort unmount!')
      document.body.removeEventListener('click', handleClickOutside);
    }
  }, []);
  
  const [open, setOpen] = React.useState(false);

  const sort = useSelector((state) => state.filter.sort)

  const dispatch = useDispatch();
  const sortRef = React.useRef();

  function onClickSort(obj) {
    dispatch(setSortIndex(obj));
    setOpen(false);
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && <div className="sort__popup">
        <ul>
          {arrSort.map((obj, i) => (
            <li key={i} onClick={() => onClickSort(obj)} className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>{obj.name}</li>
          ))}
        </ul>
      </div>}
    </div>
  )
}

export default Sort;