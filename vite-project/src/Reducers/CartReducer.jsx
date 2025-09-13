const cartInitialState = {
    cartItems :  JSON.parse(localStorage.getItem('cartItems')) || []
}

const cartReducer = (state= cartInitialState, action) => {
    let updatedCartItems

    switch(action.type){
        case 'ADD_TO_CART' : {
            const existingItem = state.cartItems.find((item) => {
                return item._id === action.payload._id
            })
            if(existingItem){
                return state 
            } else {
                updatedCartItems = [...state.cartItems, {...action.payload, quantityCount: 1}]
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
                return {...state, cartItems: updatedCartItems}
            }
        }

        case 'REMOVE_CART' : {
            updatedCartItems = state.cartItems.filter(ele => ele._id !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
            return {...state, cartItems: updatedCartItems}
        }

        case 'INCREMENT' : {
            updatedCartItems =   state.cartItems.map(ele => {
                if(ele._id ===  action.payload){
                    return {...ele, quantityCount : ele.quantityCount + 1 }
                }
                return ele
            })
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
            return {...state, cartItems: updatedCartItems}
        }

        case 'DECREMENT' : {
            updatedCartItems =   state.cartItems.map(ele => {
                if(ele._id === action.payload){
                    return {...ele, quantityCount: ele.quantityCount > 1 ? ele.quantityCount - 1 : 1}
                }
                return ele
            })
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
            return { ...state, cartItems: updatedCartItems }
        }

        default : {
            return {...state}
        }
    }
}

export default cartReducer