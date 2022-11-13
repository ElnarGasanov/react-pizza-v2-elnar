import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addPizzaOnCart(state, action) {
        //     state.items.push(action.payload);
        addPizzaOnCart(state, action) {
            const findPizza = state.items.find((obj) => obj.id == action.payload.id);

            if (findPizza) {
                findPizza.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            // Сумма всех добавленных пицц
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
            // 
        },
        plusPizza(state, action) {
            const findPizza = state.items.find((obj) => obj.id == action.payload);
            if (findPizza) {
                findPizza.count++;
            }

            // Сумма всех добавленных пицц
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
            // 
        },
        minusPizza(state, action) {
            const findPizza = state.items.find((obj) => obj.id == action.payload);

            if (findPizza) {
                findPizza.count--;
            }

            // Сумма всех добавленных пицц
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
            // 
        },
        deletePizzaOnCart(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
            // Сумма всех добавленных пицц
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
            // 
        },
        deleteAllPizzaOnCart(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    },
})

export const cartSelector = state => state.cart; //это называется Selector в Redux`e


export const { addPizzaOnCart, deletePizzaOnCart, deleteAllPizzaOnCart, minusPizza, plusPizza, } = cartSlice.actions;

export default cartSlice.reducer;