import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Card from './Card';
import { getCartFromLocalStorage, itemTotalInCart } from './cartHelpers';
import Layout from './Layout';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(getCartFromLocalStorage())
    }, [])

    const showItems = (cartItems) => {
        return (
            <div>
                <h2>Your cart has {`${cartItems.length}`} items.</h2>
                <hr />

                {cartItems.map((product, index) => (
                    <Card key={index} products={product} showAddToCartButton={false}></Card>
                ))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br />
            <Link to='/shop'>Continue Shopping</Link>
        </h2>
    )

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove or continue checkout"
            className="container-fluid"
        >
            <div className='row'>
                <div className='col-6'>
                    {
                        cartItems.length > 0 ? showItems(cartItems) : noItemsMessage()
                    }
                </div>

                <div className='col-6'>
                    <p>Show checkout option/ shipping address / total / update quantity</p>
                </div>
            </div>
        </Layout>
    )
}

export default Cart