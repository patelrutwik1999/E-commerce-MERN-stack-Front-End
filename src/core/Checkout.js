import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'

function Checkout({ products }) {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ?
                <button className='btn btn-success' > Checkout</button> :
                <Link to='/signin'>
                    <button className='btn btn-primary'>Sigin to checkout!!</button>
                </Link>

        )
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout