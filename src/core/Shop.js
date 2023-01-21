import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from '../admin/apiAdmin'
import { getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import { prices } from './fixedPrices'
import RadioBox from './RadioBox'
import Card from './Card'

function Shop() {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults(data.data)
                    setSize(data.size)
                    setSkip(0)
                }
            })
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5'>Load More</button>
            )
        )
    }

    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

        //Fetch filter products, passing current myFilters list to the backend as the filter object
        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters)
        // console.log('SHOP', filters, filterBy)
    }

    const handlePrice = (priceCurrentValue) => {
        const priceData = prices
        let priceArray = []

        for (let key in priceData) {
            if (priceData[key]._id === parseInt(priceCurrentValue)) {
                priceArray = priceData[key].array;
            }
        }
        return priceArray
    }

    return (
        <Layout
            title='Shop Page'
            description='Search and find books of your choice'
            className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by Categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}></Checkbox>
                    </ul>

                    <h4>Filter by Price Range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')}></RadioBox>
                    </div>
                </div>
                <div className='col-8'>
                    <h2 className='mb-4'>Products</h2>
                    {/* {JSON.stringify(filteredResults)} */}


                    <div className='row'>
                        {filteredResults.map((product, index) => (
                            <Card key={index} products={product}></Card>
                        ))}
                    </div>
                    <hr></hr>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop