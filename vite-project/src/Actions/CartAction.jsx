
export function addToCart(carts){
    return {
        type: 'ADD_TO_CART',
        payload: carts
    }
}

export function removeCart(carts){
    return {
        type: 'REMOVE_CART',
        payload: carts
    }
}

export function incrementQuantity(id){
    return{
        type: 'INCREMENT',
        payload: id
    }
}

export function decrementQuantity(id){
    return {
        type: 'DECREMENT',
        payload: id
    }
}