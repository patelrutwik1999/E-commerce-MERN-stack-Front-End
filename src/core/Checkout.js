import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getBraintreeClientToken } from './apiCore'
// import "braintree-web"; // not using this package
import DropIn from 'braintree-web-drop-in-react';

function Checkout({ products, setRun = f => f, run = undefined }) {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: false,
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (user, token) => {
        getBraintreeClientToken(userId, token).then(response => {
            if (response.error) {
                setData({ ...data, error: response.error })
            } else {
                setData({ ...data, clientToken: response.clientToken })
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ?
                <div>
                    {showDropIn()}
                    {console.log(products.length)}
                </div> :
                <Link to='/signin'>
                    <button className='btn btn-primary'>Sigin to checkout!!</button>
                </Link>
        )
    }

    const buy = () => {
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()

        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data)
                nonce = data.nonce

                //once you have nonce (card type, card number) send nonce as a 'paymentMethodNonce'
                //and also total to be charged
                console.log('Send nonce and total to process', nonce, getTotal(products))
            })
            .catch(error => {
                console.log("Drop in error", error)
                setData({ ...data, error: error.message })
            })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success">
                        Pay
                    </button>
                </div>
            ) :
                null}
        </div>
    )

    const showError = (error) => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout