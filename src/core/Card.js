import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'

function Card({ products }) {
    return (
        <div className='col-4 mb-3'>
            <div className='card'>
                <div className='card-header'>{products.name}</div>
                <div className='card-body'>
                    <ShowImage item={products} url="product"></ShowImage>
                    <p>{products.description}</p>
                    <p>{products.price}</p>
                    <Link to="/">
                        <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                            View Product
                        </button>
                    </Link>
                    <button className='btn btn-outline-success mt-2 mb-2'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Card