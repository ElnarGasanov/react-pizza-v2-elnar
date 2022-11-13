import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk('pizzas/fetchPizzaStatus', async (params) => {
    const { pageCount, category, sortBy, order, searchValue } = params;
    const { data } = await axios.get(`https://634fc7cf78563c1d82af85a3.mockapi.io/pizzasItems?&page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`)

    return data;
}
)


const initialState = {
    items: [],
    status: 'loading', //loading | good | error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizza.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'good'  
        },
        [fetchPizza.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }
})


export const { setPizzas, } = pizzasSlice.actions;

export default pizzasSlice.reducer;