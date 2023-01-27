import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import { emptyCart } from './cartHelpers'
// import "braintree-web"; // not using this package
import DropIn from 'braintree-web-drop-in-react';

function Checkout({ products, setRun = f => f, run = undefined }) {
    const [data, setData] = useState({
        loading: false,
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
                setData({ clientToken: response.clientToken })
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

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true })
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

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                console.log(paymentData)

                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response)
                        setData({ ...data, success: response.success })
                        //empty cart

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction_id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        }

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    console.log('Payment success and empty cart!')
                                    setData({ loading: false, success: true })
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                setData({ loading: false, success: false })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        setData({ loading: false })
                    })
            })
            .catch(error => {
                console.log("Drop in error", error)
                setData({ ...data, error: error.message })
            })
    }

    const handleAddress = (event) => {
        setData({ ...data, address: event.target.value })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className='form-group mb-3'>
                        <label className='text-muted'>Delivery Address:</label>
                        <textarea onChange={handleAddress}
                            className='form-control'
                            value={data.address}
                            placeholder='Type your delivery address here...'>

                        </textarea>
                    </div>

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">
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

    const showSuccess = (success) => (
        <div className='alert alert-info' style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful.
        </div>
    )

    const showLoading = (loading) => {
        return <h2>Loading</h2>
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout