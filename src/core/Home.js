import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './Card';
import Search from './Search';

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
            <Layout title="Home Page" description="Node React E-Commerce Website" className="container-fluid">

                <Search></Search>
                <h2 className='mb-4'>New Arrivals</h2>
                <div className='row'>
                    {productsByArrival.map((product, i) => (
                        <div key={i} className='col-4 mb-3'>
                            <Card products={product}></Card>
                        </div>
                    ))}
                </div>

                <hr></hr>

                <h2 className='mb-4'>Best Sellers</h2>
                <div className='row'>
                    {productsBySell.map((product, i) => (
                        <div key={i} className='col-4 mb-3'>
                            <Card products={product}></Card>
                        </div>
                    ))}
                </div>
            </Layout>
        </div>
    )
}

export default Home