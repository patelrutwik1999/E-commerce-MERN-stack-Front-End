import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { read, update, updateUser } from './apiUser';

function Profile(props) {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: ''
    });

    const { token } = isAuthenticated();

    const { name, email, password, error, success } = userDetails;

    const init = (userId) => {
        read(userId, token)
            .then(data => {
                if (data.error) {
                    setUserDetails({ ...userDetails, error: true })
                } else {
                    setUserDetails({ ...userDetails, name: data.name, email: data.email })
                }
            })
    }

    useEffect(() => {
        init(props.match.params.userId);
    }, [])

    const handleChange = (dataField) => (e) => {
        setUserDetails({ ...userDetails, error: false, [dataField]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        update(props.match.params.userId, token, { name, email, password })
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    updateUser(data, () => {
                        setUserDetails({ ...userDetails, name: data.name, email: data.email, success: true })
                    })
                }
            })
    }

    const redirectUser = (success) => {
        if (success) return <Redirect to='/cart'></Redirect>
    }

    const profileUpdate = (name, email, password) => {
        return (
            <form>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input
                        className='form-control'
                        type='text'
                        onChange={handleChange('name')}
                        value={name}
                    ></input>

                    <label className='text-muted'>Email</label>
                    <input
                        className='form-control'
                        type='email'
                        onChange={handleChange('email')}
                        value={email}
                    ></input>

                    <label className='text-muted'>Password</label>
                    <input
                        className='form-control'
                        type='password'
                        onChange={handleChange('password')}
                        value={password}
                    ></input>
                </div>

                <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
            </form>
        )
    }

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2 className='mb-4'>Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(userDetails.success)}
        </Layout>
    )
}

export default Profile