import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, cartUpdateItem, removeCartItem } from './cartHelpers'

function Card({
    products,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f, //Default value of the function
    run = undefined //default value of undefined
}) {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(products.count)

    const showViewButton = (showViewProductButton) => (
        showViewProductButton && (
            <Link to={`/product/${products._id}`} >
                <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                    View Product
                </button>
            </Link >
        )
    )

    const showAddToCart = () => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className='btn btn-outline-success mt-2 mb-2' >
                    Add to Cart
                </button>
            )
        )
    }

    const addToCart = () => (
        addItem(products, () => {
            setRedirect(true)
        })
    )

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart"></Redirect>
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

    const showCartUpdateOptions = (cartUpdate) => {
        return cartUpdate &&
            <div>
                <div className='input-group mb-3'>
                    <div className='intput-group-prepend'>
                        <span className='input-group-text'>Adjust Quantity</span>
                    </div>
                    <input type='number' className='form-control' value={count} onChange={handleChange(products._id)}></input>
                </div>
            </div>
    }

    const handleChange = (productId) => (event) => {
        setRun(!run); //run useEffect in parent class.
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            cartUpdateItem(productId, event.target.value)
        }
    }

    const showRemoveButton = (showRemoveProductButton) => {
        return (
            showRemoveProductButton && (
                <button
                    className='btn btn-outline-danger mt-2 mb-2'
                    onClick={
                        () => {
                            removeCartItem(products._id)
                            setRun(!run) //run useEffect in the parent class
                        }
                    }
                >
                    Remove
                </button >
            )
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

                {showAddToCart(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card