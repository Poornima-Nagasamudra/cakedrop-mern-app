import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetProduct } from '../../Actions/ProductAction'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [rawInput, setRawInput] = useState("");

    const products = useSelector((state) => {
        return state.product.data
    })

    useEffect(()=>{
        dispatch(startGetProduct())
    },[dispatch])

    let counter =0

    function handleSearch(e){
        // setRawInput(e.target.value);
        debouncedSearch(e.target.value)
    }

    // function doSomeMagic(fn, delay){
    //     let timer
    //     return function(){
    //         let context = this,
    //         args = arguments
    //         clearTimeout(timer)

    //         timer = setTimeout(() =>{
    //             handleSearch.apply(context, arguments)
    //         }, delay)
    //     }
    // }
    // const betterFunction = doSomeMagic(handleSearch, 300)

    function debounce(fn, delay){
        let timer
        return function(...args){
            clearTimeout(timer)

             timer = setTimeout(() => {
               fn(...args);
             }, delay);
        }  
    }

    const debouncedSearch = useCallback(debounce((value) =>{
        setSearch(value.toLowerCase())
    }, 300),
    [search]
)

    const filetredValue = products.filter(function(ele){
        return ele.category.toLowerCase().includes(search)
    })

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div>
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
            {" "}
            Product Lists
          </h1>

          <div className="mb-6 flex justify-center text-purple-500">
            <input
              type="text"
              placeholder="Search by category..."
              //value={rawInput}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filetredValue.map((prod) => {
              return (
                <div
                  key={prod._id}
                  className="bg-white  shadow-md rounded-lg overflow-hidden transition hover:shadow-xl"
                >
                  <img
                    src={`http://localhost:4100/${prod.image}`}
                    alt={prod.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {" "}
                      {prod.name}{" "}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">
                      {" "}
                      {prod.description}{" "}
                    </p>
                    <p className="font-bold text-purple-600 mb-3">
                      Price: ₹ {prod.price}{" "}
                    </p>
                    <Link
                      to={`/products/${prod._id}`}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      {" "}
                      View Details{" "}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}

export default ProductList