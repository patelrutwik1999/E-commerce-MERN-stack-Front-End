import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

function Product(props) {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const loadSingleProduct = (productId) => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                //fetch related product
                listRelated(data._id)
                    .then(response => {
                        if (response.error) {
                            setError(response.error)
                        } else {
                            setRelatedProduct(response)
                        }
                    })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout
            title={product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className='row'>
                <div className='col-8'>
                    {product && product.description &&
                        <Card products={product} showViewProductButton={false}></Card>
                    }
                </div>
                <div className='col-4'>
                    <h4>Related Products</h4>
                    {relatedProduct.map((product, index) => (
                        <div className='mb-3'>
                            <Card key={index} products={product}></Card>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product