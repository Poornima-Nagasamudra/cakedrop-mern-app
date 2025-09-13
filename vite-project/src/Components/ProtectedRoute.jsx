import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({role: allowedRole, children }){
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role') // Set during login

    if (!token) {
        return <Navigate to="/login" />
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/unauthorized" />
    }
    
    return children
}

export default ProtectedRoute