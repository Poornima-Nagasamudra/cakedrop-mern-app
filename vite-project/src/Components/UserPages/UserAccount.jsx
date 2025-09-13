import React , { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserAccount } from ("../../Actions/UserAction")

const UserAccount = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUserAccount())
    },[dispatch])

    return(
        <div>
            <h1> Hi</h1>
        </div>
    )
}

export default UserAccount