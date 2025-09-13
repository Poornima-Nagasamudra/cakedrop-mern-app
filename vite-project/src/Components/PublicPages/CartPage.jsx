import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, incrementQuantity, removeCart } from '../../Actions/CartAction'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))


    const cartItem = useSelector((state) => {
        return state.cart.cartItems
    })

    function handleRemove(id){
        dispatch(removeCart(id))
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id))
    }

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id))
    }

    const totalCartAmount = cartItem.reduce(function(pV, cV){
        const quantities = cV.quantityCount || 1;
        return pV + cV.price * quantities
    },0)

    const handleCheckout = () => {
        navigate('/checkout')
    }

    return(
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-6 border-b pb-2'>Your Cart</h1>    

                {cartItem.length === 0 ? (
                    <p className='text-center text-lg text-gray-500'>🛒 Your cart is currently empty</p>
                    ) : (
                    <div className='grid md:grid-cols-3 gap-8'> 
                    <div className='md:col-span-2 space-y-4'>
                    {cartItem.map(function(cart){
                        return(
                        <div key={cart._id} className='flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4'> 
                            <img src={`http://localhost:4100/${cart.image}`} alt={cart.name} className='w-32 h-32 object-cover rounded' />
                            <div className='flex-1 ml-0 md:ml-6 text-center md:text-left mt-4 md:mt-0'>
                                <h2 className='text-lg font-semibold'>{cart.name} </h2> 
                                <p>Quantity: {cart.quantity}</p>
                                <p className='text-gray-600'>Flavour: {cart.flavour}</p>
                                <p className='text-gray-600'>Type: {cart.eggChoice}</p>                            
                                <p className='text-gray-800 font-semibold mt-1'>Price: ₹{cart.price}  </p>
                            </div>
                            <div className="flex justify-center md:justify-start items-center mt-3 space-x-2">
                                <button onClick={() => handleDecrement(cart._id)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                                <span className='font-medium'>{cart.quantityCount || 1}</span>
                                <button onClick={() => handleIncrement(cart._id)}  className="bg-gray-200 px-2 py-1 rounded" >+</button>
                            </div>

                            <button onClick={() => handleRemove(cart._id)}   className="mt-3 text-red-500 hover:text-red-700">Remove</button>
                        </div>)
                    })}
                    </div>
                    </div>) 
                }

                    <div className="bg-gray-100 rounded-lg p-4 shadow-md h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <p className="text-lg">
                            Total: <span className="font-bold text-green-600">₹{totalCartAmount.toFixed(2)}</span>
                        </p>

                        {user && user.role === 'user' && (
                            <button
                            onClick={handleCheckout}
                            className="mt-6 w-full bg-green-600 text-black py-2 rounded hover:bg-green-700 transition"
                            >
                            Proceed to Checkout
                            </button>
                        )}
                       
                    </div>
        </div>
    )
}

export default CartPage