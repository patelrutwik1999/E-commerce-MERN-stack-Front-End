import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values
    const { user } = isAuthenticated

    //Higher order functions - where functions return another function
    const handleChange = (name) => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    //prevent default behaviour, since on submit the page will reload and we do not want that behaviour.
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data, () => {
                            setValues({ ...values, redirectToReferrer: true })
                        }
                    )
                }
            })
    }

    const SigninForm = () => (
        <form>
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

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && (user.role === 1)) {
                console.log("user.role")
                return (

                    <Redirect to="/admin/dashboard" />);
            } else {
                console.log("user.role.user")
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    }

    return (
        <div>
            <Layout title="Sigin Page" description="Signin to Node React E-Commerce Website" className="container">
                {showLoading()}
                {showError()}
                {SigninForm()}
                {redirectUser()}
            </Layout>

        </div>
    )

}

export default Signin;