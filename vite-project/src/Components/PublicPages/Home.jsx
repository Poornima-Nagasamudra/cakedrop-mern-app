import React from 'react'
import { Link } from 'react-router-dom'
import cakeImage from '../../assets/home.jpg'

const Home = () => {

    return(
        <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-10">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2">
                <img
                    src={cakeImage}
                    alt="Delicious cake"
                    className ="w-full h-full object-cover"
                />
                </div>

                <div className="p-8 flex flex-col justify-center items-center md:items-start md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 ">Welcome to <span classNameName="text-pink-700">CakeDrop</span></h1>
                    <p className="text-lg text-gray-700 mb-6 ">            Your favorite destination for delicious and delightful cakes.
                    Order custom cakes for birthdays, weddings, and every celebration.</p>
                    <Link to="/products" className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md">  Shop now </Link>
                </div>
            </div>
        </div>
    )
}

export default Home