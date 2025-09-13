import axios from 'axios'

//Register
export function startCreateRegister(values, navigate){
    return (dispatch) =>{
        axios.post('http://localhost:4100/api/cakedrop/register', values)
           .then((response) => {
              const result = response.data
              if(result.hasOwnProperty('errors')){
                // alert(result.errors)
                console.log(result.errors)
              } else {
                alert('succefully registered')
                navigate('/login')
                dispatch(userRegister(result))
              }

           })
           .catch((err) => {
             // alert(err.message)
              console.log(err)
           })
    }
    
}
function userRegister(users){
    return {
        type: 'USER_REGISTER',
        payload: users
    }
}

//Login
export function startCreateLogin(values, navigate){
    return (dispatch) => {
        axios.post('http://localhost:4100/api/cakedrop/login', values)
          .then((response) => {
            const result = response.data
            console.log('login result', result)
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            } else{
                alert('succefully login')
                localStorage.setItem('token', result.token)
                localStorage.setItem('role', response.data.user.role)
             // This triggers the 'storage' event
                window.dispatchEvent(new Event("storage"));
                navigate('/home')
                dispatch(userLogin(result))
            }
          })
    }
}

function userLogin(users){
    return {
        type: 'USER_LOGIN',
        payload: users
    }
}

//UserAccount
export function startGetUserAccount(){
    return (dispatch) => {
        axios.get('http://localhost:4100/api/cakedrop/account', {
            headers : {
                'Authorization' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data 
            dispatch(getAccount(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}
function getAccount(user){
    return {
        type: 'GET_USER_ACCOUNT',
        payload: user
    }
}