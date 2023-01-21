import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem } from './cartHelpers'

function Card({ products, showViewProductButton = true }) {
    const [redirect, setRedirect] = useState(false)

    const showViewButton = (showViewProductButton) => (
        showViewProductButton && (
            <Link to={`/product/${products._id}`} >
                <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                    View Product
                </button>
            </Link >
        )
    )

    const showAddToCartButton = () => (
        <button onClick={addToCart} className='btn btn-outline-success mt-2 mb-2'>
            Add to Cart
        </button>
    )

    const addToCart = () => (
        addItem(products, () => {
            setRedirect(true)
        })
    )

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/card"></Redirect>
        }
    }

    const showStock = (qunatity) => {
        // console.log(qunatity)
        return (
            qunatity > 0 ?
                <span className='badge badge-primary badge-pill'>In Stock</span> :
                <span className='badge badge-primary badge-pill'>Out of Stock</span>
        )
    }

    return (
        <div className='card'>
            <div className='card-header name'>{products.name}</div>
            <div className='card-body'>
                {shouldRedirect(redirect)}
                <ShowImage item={products} url="product"></ShowImage>
                <p className='lead mb-2'>{products.description.substring(0, 100)}</p>
                <p className='black-10'>${products.price}</p>
                <p className='black-9'>Category: {products.category.name}</p>
                <p className='black-8'>
                    Added on {moment(products.createdAt).fromNow()}
                </p>

                {showStock(products.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCartButton()}
            </div>
        </div>
    )
}

export default Card