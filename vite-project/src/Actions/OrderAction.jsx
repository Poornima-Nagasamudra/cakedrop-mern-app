import axios from "axios"

// Get only my orders
export function startGetMyOrders() {
    return (dispatch) => {
        axios.get('http://localhost:4100/api/cakedrop/myorders', {
            headers : {
                'Authorization' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data 
            dispatch(getMyOrders(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}
function getMyOrders(ord){
    return {
        type: 'GET_MY_ORDERS',
        payload: ord
    }
}

// Create orders
export function startCreateOrder(items, resetCartCallback){
    return (dispatch) => {
        const cleanedItems = items.map((item) => ({
            ...item,
            quantity: typeof item.quantity === 'string'
                ? parseFloat(item.quantity)  // safely convert "2kg" → 2
                : item.quantity
        }))
        axios.post('http://localhost:4100/api/cakedrop/order', {items : cleanedItems} ,{
            headers : {
                'Authorization' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data 
            dispatch(createOrder(result))
            if (resetCartCallback) {
                resetCartCallback()
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}
function createOrder(ord){
    return {
        type: 'CREATE_ORDER',
        payload: ord
    }
}