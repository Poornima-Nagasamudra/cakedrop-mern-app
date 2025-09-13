import React , {  useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import   { startGetMyOrders } from "../../Actions/OrderAction"

const MyOrders = () => {
    const dispatch = useDispatch()

    const orders = useSelector((state) => {
        return state.order.orderItems
    })

    useEffect(() => { 
        dispatch(startGetMyOrders())
    },[dispatch])


    return(
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Your Orders</h2>

                {orders.length === 0 ?  (
                    <p className="text-center text-gray-600"> No past orders yet.  </p> 
                ): (
                    <div className="space-y-8">
                        {orders.map(function(ord){
                            return (
                            <div key={ord._id} className="bg-white shadow-md rounded-md p-5 border border-gray-200">  
                                <p className="text-sm font-semibold text-gray-600 mb-4">
                                    Order ID: <span className="font-mono">{ord._id}</span>
                                </p>

                                <div className="space-y-3 mb-4">
                                    {ord.items.map((item) => {
                                        return (
                                            <div key={item._id}    className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0"> 
                                                <p className="text-gray-800 font-medium">
                                                     {item.product.name} x {item.quantity}
                                                </p>
                                                <p className="text-gray-700 font-semibold">
                                                     ₹{item.product.price * item.quantity}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>  

                                 <p className="text-right text-lg font-bold text-indigo-600">Total : ₹{ord.totalAmount}</p> 
                            </div>)
                        })}
                     </div>
                ) 
                }
            </div>
    )
}

export default MyOrders