import React from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux'

import { setPageIndex } from '../../redux/slices/filterSlice.js';

import styles from './Pagination.module.scss'

const Pagination = () => {

    const paginationValue = useSelector((state) => state.filter.pageCount);
    const dispatch = useDispatch();

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel="=>"
            onPageChange={(event) => dispatch(setPageIndex(event.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={paginationValue - 1}
            previousLabel="<="
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;