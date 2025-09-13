const productInitialState = {
    data : [],
    single: null
}

const productReducer = (state = productInitialState, action) => {
    switch(action.type){
        case  'GET_PRODUCTS' : {
            return {...state,  data: [...action.payload]}
        }

        case 'GET_PRODUCTS_BY_ID': {
            return {...state, single: action.payload}
        }

        default : {
            return {...state}
        } 
    }
}

export default productReducer