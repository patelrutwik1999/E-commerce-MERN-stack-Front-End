import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { apiCore, getProducts } from './apiCore'

function Home() {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => (
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data)
            }
        })
    )


    const loadProductsByArrival = () => (
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data)
            }
        })
    )

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, [])

    return (
        <div>
            <Layout title="Home Page" description="Node React E-Commerce Website">
                {JSON.stringify(productsByArrival)}
                <hr></hr>
                {JSON.stringify(productsBySell)}
            </Layout>
        </div>
    )
}

export default Home