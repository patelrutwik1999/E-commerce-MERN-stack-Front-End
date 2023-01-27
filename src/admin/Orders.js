import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValue } from './apiAdmin'
import Layout from '../core/Layout';
import moment from 'moment';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([])


    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if (data.errors) {
                    console.log(data.error)
                } else {
                    setOrders(data)
                }
            })
    }

    const loadStatusValues = () => {
        getStatusValue(user._id, token)
            .then(data => {
                if (data.errors) {
                    console.log(data.error)
                } else {
                    setStatusValues(data)
                }
            })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, [])

    const showOrdersLength = orders => {
        if (orders.length > 1) {
            return (
                <h1 className='text-danger display-2'>Total Orders: {orders.length}</h1>
            )
        } else {
            return (
                <h1 className='text-danger'>No orders</h1>
            )
        }
    }

    const showInput = (key, value) => {
        return (
            <div className='input-group mb-2 mr-sm-2'>
                <div className='input-group-prepend'>
                    <div className='input-group-text'>
                        {key}
                    </div>
                    <input type='text' value={value} className='form-control' readOnly></input>
                </div>
            </div>
        )
    }

    const handleStatusChange = (event, orderId) => {
        console.log("updateOrderStatus")
    }

    const showStatus = (order) => (
        <div className='form-group'>
            <h3 className='mark mb-4'>Status: {order.status}</h3>
            <select className='form-control' onChange={(e) => handleStatusChange(e, order._id)}>
                <option>Update Status</option>
                {statusValues.map((status, statusIndex) => (
                    <option key={statusIndex} value={status}>{status}</option>
                ))}
            </select>
        </div>
    )


    return (
        <Layout title='Orders' description={`G'Day ${user.name}, you can manage all the orders here`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showOrdersLength(orders)}
                    {orders.map((order, orderIndex) => {
                        return (
                            <div className='mt-5' key={orderIndex} style={{ borderBottom: "5px solid indigo" }}>
                                <h2 className='mb-5'>
                                    <span className='bg-primary'>Order Id: {order._id}</span>
                                </h2>

                                <ul className='list-group mb-2'>
                                    <li className='list-group-item'>
                                        {showStatus(order)}
                                    </li>
                                    <li className='list-group-item'>
                                        Transaction ID: {order.transaction_id}
                                    </li>
                                    <li className='list-group-item'>
                                        Amount: ${order.amount}
                                    </li>
                                    <li className='list-group-item'>
                                        Ordered By: {order.user.name}
                                    </li>
                                    <li className='list-group-item'>
                                        Ordered On: {moment(order.createdAt).fromNow()}
                                    </li>
                                    <li className='list-group-item'>
                                        Delivery Address: {order.address}
                                    </li>
                                </ul>

                                <h3 className='mt-4 mb-4 font-italic'>Total products in the order: {order.products.length}</h3>

                                {order.products.map((product, productIndex) => {
                                    return (
                                        <div className='mb-4' key={productIndex} style={{ padding: '20px', border: '1px solid indigo' }} >
                                            {showInput('Product name', product.name)}
                                            {showInput('Product price', product.price)}
                                            {showInput('Product total', product.count)}
                                            {showInput('Product Id', product._id)}
                                        </div>
                                    )
                                }
                                )}
                            </div>

                        )
                    })}
                </div>
            </div>
        </Layout>)
}

export default Orders