import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from '../admin/apiAdmin'
import Checkbox from './Checkbox'

function Shop() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

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

    useEffect(() => {
        init()
    }, [])

    return (
        <Layout
            title='Shop Page'
            description='Search and find books of your choice'
            className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by Categories</h4>
                    <ul>
                        <Checkbox categories={categories}></Checkbox>
                    </ul>
                </div>
                <div className='col-8'>
                    right
                </div>
            </div>
        </Layout>
    )
}

export default Shop