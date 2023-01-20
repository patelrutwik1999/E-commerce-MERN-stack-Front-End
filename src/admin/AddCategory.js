import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin';
import { Link } from 'react-router-dom';

function AddCategory() {
    const [name, setName] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);

    //Destructing user info from local storage
    const { user, token } = isAuthenticated();

    //It will grab the event
    const handleChange = (e) => {
        setErr('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setErr('');
        setSuccess(false)

        //Make request to the api for creating the category.
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setErr(data.err)
                } else {
                    setErr('');
                    setSuccess(true);
                }
            })
    }

    const showSuccess = () => {
        if (success) {
            return (<h3 className='text-success'>{name} is created.</h3>)
        }
    }

    const showError = () => {
        if (err) {
            return (<h3 className='text-danger'>{name} name should be unique.</h3>)
        }
    }

    const goBack = () => (
        <div className='mt-5'>
            <Link to="/admin/dashboard" className='text-warning'>Back to Dashboard</Link>
        </div>
    )

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus />
                </div>
                <button className='btn btn-outline-primary'>Create Category</button>
            </form>
        )
    }
    return (
        <Layout title='Add a new category' description={`G'Day ${user.name}, ready to create a new category?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory