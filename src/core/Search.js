import React, { useEffect, useState } from 'react'
import { getCategories } from '../admin/apiAdmin'
import { list } from './apiCore'
import Card from './Card'

function Search() {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.errors) {
                console.log(data.erros)
            } else {
                setData({ ...data, categories: data })
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const searchedData = () => {
        if (search) {
            // console.log(search)
            list({ search: search || undefined, category: category }).then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setData({ ...data, results: response, searched: true });
                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        searchedData()
    }

    //Grabbing the change in the seach bar or the category options.
    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value, searched: false })
    }

    const searchForm = () => {
        return (


            <form onSubmit={searchSubmit}>
                <span className='input-group-text'>
                    <div className="input-group input-group-lg">
                        <div className='input-group-prepend'>
                            <select className='btn mr-2' onChange={handleChange('category')}>
                                <option value="All">All</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="search"
                            className="form-control"
                            onChange={handleChange('search')}
                            placeholder='Search by name'>
                        </input>
                    </div>
                    <div className='btn input-group-append' style={{ border: 'none' }}>
                        <button className='input-group-text'>Search</button>
                    </div>
                </span>
            </form>
        )
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`
        }

        if (searched && results.length < 1) {
            return `No Products Found`
        }
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>

                <div className='row'>
                    {results.map((product, index) => (
                        <Card key={index} products={product}></Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='container mb-3'>
                {searchForm()}
            </div>
            <div className='container-fluid mb-3'>
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search