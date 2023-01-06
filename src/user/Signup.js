import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Layout from "../core/Layout";
import { signup } from "../auth/index"

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values

    //Higher order functions - where functions return another function
    const handleChange = (name) => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }



    //prevent default behaviour, since on submit the page will reload and we do not want that behaviour.
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({ ...values, name: '', email: '', password: '', error: '', success: true })
                }
            })
    }

    const SignupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} value={name} className="form-control"></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} value={email} className="form-control"></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} value={password} className="form-control"></input>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New Account is created. Please <Link to="/signin">Signin</Link >
        </div>
    )

    return (
        <div>
            <Layout title="Sigup Page" description="Signup to Node React E-Commerce Website" className="container">
                {showError()}
                {showSuccess()}
                {SignupForm()}
                {/* {JSON.stringify(values)} */}
            </Layout>
        </div>
    )
}

export default Signup;