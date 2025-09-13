import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { startGetProduct, startGetProductById } from '../../Actions/ProductAction'
import { addToCart } from '../../Actions/CartAction'

const ProductDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1);
    const [flavour, setFlavour] = useState('');
    const [eggChoice, setEggChoice] = useState('')

    const quantityOption = [0.5, 1, 1.5, 2, 2.5, 3, 4]

    const flavours = ['Buterscotch', 'Triple layer', 'Creamy Vanilla', 'Black Current', 'Pineapple', 'Creamy Strawberry', 'Melting Blueberry', 'Black Forest']


    const products = useSelector((state) =>{
        return state.product.data.find((p) =>{
            return p._id === id
        })
    })
    console.log("Product Details Page - product:", products)


    useEffect(() =>{
        if (!products) {
            dispatch(startGetProduct());
        }    
    },[dispatch, products])


    function handleAddtoCart(id){
        console.log(id, '1111')
        const cartItem1 = {
            _id: products._id,
            name: products.name,
            price: products.price,
            image: products.image,
            quantity,
            flavour,
            eggChoice
        }
        dispatch(addToCart(cartItem1))
        navigate('/cart')
    }

    if (!products) return <p className="text-center">Loading...</p>;

    return(
        <div className="p-6 flex flex-col md:flex-row gap-8 bg-gray-50 min-h-screen">
            <div className="md:w-1/2 flex justify-center" >
                        <img src={`http://localhost:4100/${products.image}`} alt={products.name}     className="w-full h-auto max-w-md rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 space-y-4">
                        <h2  className="text-3xl text-center font-bold text-purple-700"> {products.name} </h2>
                        <p className="text-gray-700"> {products.description} </p>
                        <p className="text-2xl font-semibold text-green-600"> ₹ {products.price} </p>

                        <div >
                        <h3 className="font-semibold text-gray-800 mb-1">Type</h3>

                        <div  className="flex flex-wrap gap-2">
                        {['Egg', 'Eggless'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setEggChoice(type)}
                                    className={`px-8 py-8 rounded border ${
                                        eggChoice === type
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white text-gray-700 border-gray-300'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        
            </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">Quantity</h3>
                           <div className="flex flex-wrap gap-2">
                            {quantityOption.map((ele) => {
                                console.log(ele, 'quantityOption')
                                        return  <button key={ele}  
                                        onClick={() => setQuantity(ele)}
                                        className={`px-4 py-2 rounded border ${
                                            quantity === ele
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white text-gray-700 border-gray-300'
                                        }`}> {ele} kg  </button>
                                    })}
                             </div>
                        </div>

                        <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Flavour</h3>
                        <div className="flex flex-wrap gap-2">
                        {flavours.map(function(ele){
                                return <button key={ele} 
                                onClick={() => setFlavour(ele)} 
                                className={`px-4 py-2 rounded border ${
                                    flavour === ele
                                        ? 'bg-purple-600 text-purple-300'
                                        : 'bg-white text-gray-700 border-gray-300'
                                }`}> {ele} </button>
                            })}
                            </div>
                        </div>

                        <button onClick={() => handleAddtoCart(id)} className='bg-yellow-600 hover:bg-yellow-100'> Add to Cart </button>
                   
            </div>
        </div>
    )
}

export default ProductDetails