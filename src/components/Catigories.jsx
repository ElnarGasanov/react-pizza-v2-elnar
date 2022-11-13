import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryIndex } from '../redux/slices/filterSlice.js'

function Catigories() {
  const allCategories = ['Все', 'Мясные', 'Веган', 'Гриль', 'Острые', 'Закрытые',]

  const categoryIndex = useSelector((state) => state.filter.categoryIndex);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {allCategories.map((el, index) => (
          <li key={index} onClick={() => (dispatch(setCategoryIndex(index)))} className={categoryIndex === index ? 'active' : ''}>{el}</li>
        ))}
      </ul>
    </div>
  )
}

export default Catigories;