import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreateOrder } from "../../Actions/OrderAction"
import { useNavigate } from "react-router-dom"


const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[name, setName] = useState('')
    const[phone, setPhone] = useState('')
    const[address, setAddress] = useState('')

    const cartItems = useSelector((state) => {
        return state.cart.cartItems
    })

    function handleCheckSubmit(e){
        e.preventDefault()

        if(!name || !phone || !address){
            alert('Please fill all fields')
            return
        }

        const items = cartItems.map(function(item){
            return {
                product: item._id, 
                quantity: item.quantity
            }
        })

        if(items.length === 0){
            alert('Your cart is empty')
            return
        }

        dispatch(startCreateOrder(items, () => {
            alert('Sucessfully Order Placed')
            navigate('/myorder')
        }))
    }

    return(
        <div className="flex items-center justify-center min-h-[80vh] bg-pink-50 px-4">
            <form onSubmit={handleCheckSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4"            >
                <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">Checkout</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                        type="text" 
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea 
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <button type="submit"     className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold transition"                > Place Order</button>
            </form>
        </div>
    )
}

export default Checkout