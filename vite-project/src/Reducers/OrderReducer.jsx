const orderInitialState = {
    orderItems : []
}

const orderReducer = (state = orderInitialState, action) => {
    switch(action.type){
        case 'GET_MY_ORDERS' : {
            return {...state, orderItems: [...action.payload]}
        }

        case 'CREATE_ORDER' : {
            return {...state, orderItems: [...state.orderItems, action.payload]}
        }

        default : {
            return {...state}
        }
    }
}

export default orderReducer