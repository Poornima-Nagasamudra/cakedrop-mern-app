const initialState = {}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'USER_REGISTER' : {
            return {...state, ...action.payload}
        }

        case 'USER_LOGIN' : {
            return {...state, ...action.payload}
        }

        case 'GET_USER_ACCOUNT' : {
            return {...state, ...action.payload}
        }

        default : {
            return {...state}
        }
    }
}

export default userReducer