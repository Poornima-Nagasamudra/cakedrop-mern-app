import axios from "axios"

export function startGetProduct() {
    return (dispatch) => {
        axios.get('http://localhost:4100/api/cakedrop/product', {
            headers : {
                'Authorization' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data 
            dispatch(getProducts(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}
function getProducts(products){
    return {
        type : 'GET_PRODUCTS',
        payload: products
    }
}

export function startGetProductById(id){
    return (dispatch) => {
        axios.get(`http://localhost:4100/api/cakedrop/product/${id}`, {
            headers : {
                'Authorization' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data 
            dispatch(getProductsById(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}
function getProductsById(products){
    return {
        type: 'GET_PRODUCTS_BY_ID',
        payload: products
    }
}