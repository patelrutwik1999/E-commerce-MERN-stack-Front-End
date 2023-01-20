import React from 'react'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout';

function AddProduct() {

    const { user, token } = isAuthenticated();
    return (
        <Layout title='Add a new product' description={`G'Day ${user.name}, ready to create a new product?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>

                </div>
            </div>
        </Layout>
    )
}

export default AddProduct