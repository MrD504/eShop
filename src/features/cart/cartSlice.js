const { configureStore, createAction, createSlice } = require("@reduxjs/toolkit");


const initialState = {
    cart: [],
    total: 0
}

function calculateCartTotal(acc, item) {
    return 0;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: {
            reducer(state, action) {
                console.log(action)
            // if item already exists add one to total
            // otherwise add to list
            // work out new total
            },
            prepare(item) {
                return {payload: {item}}
            }
        },
        removeItem: {
            reducer(state, action) {
                const product = state.cart.find(product => product.name === action.payload.name);
                // if quantity is total amount of items 
                if(product.quantity >= action.payload.quantity) {
                    // remove from list totally
                } else {
                    product.quantity -= action.payload.quantity
                }
               // work out new total
            },
            prepare(item) {
                return {payload: {item}}
            }
        },
    }
})

export const { addItem, removeItem } = cartSlice.actions;
console.log(addItem)
export default cartSlice.reducer;
// const store = configureStore({
    // reducer: cartSlice.reducer
// })