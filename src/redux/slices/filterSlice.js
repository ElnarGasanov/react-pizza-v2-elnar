import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
    categoryIndex: 0,
    pageCount: 1,
    searchValue: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSortIndex(state, action) {
            state.sort = action.payload;

            // console.log("записалось в state sort", state.sort);
        },
        setCategoryIndex(state, action) {
            state.categoryIndex = action.payload;

            // console.log("записалось в state category", state.category);
        },
        setPageIndex(state, action) {
            state.pageCount = action.payload;

            // console.log("записалось в state page", state.pageCount);
        },
        setFilters(state, action) {
            state.sort = action.payload.sortingFilters;
            state.pageCount = Number(action.payload.pageCount);
            state.categoryIndex = Number(action.payload.categoryIndex);

            // console.log(action.payload.pageCount, 'пришло в action.payload.pageCount')
            // console.log(action.payload.categoryIndex, 'пришло в action.payload.categoryIndex')
            // console.log(action.payload.sortingFilters, 'пришло в action.payload.sortingFilters')
        },
        setInputValue(state, action) {
            state.searchValue = action.payload;

            // console.log("записалось в state search MAIN", state.inputValue);
        }
    },
})


export const { setSortIndex, setCategoryIndex, setPageIndex, setFilters, setInputValue, } = filterSlice.actions

export default filterSlice.reducer;