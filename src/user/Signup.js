import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../config"

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password } = values

    //Higher order functions - where functions return another function
    const handleChange = (name) => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    //Send data to backend
    const signup = (user) => {
        //console.log(name, email, password);
        //It is available with the brower itself

        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    }

    //prevent default behaviour, since on submit the page will reload and we do not want that behaviour.
    const onSubmit = (event) => {
        event.preventDefault();
        signup({ name, email, password })
    }

    const SignupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control"></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control"></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control"></input>
            </div>

            <button onClick={onSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    return (
        <div>
            <Layout title="Sigup Page" description="Signup to Node React E-Commerce Website" className="container">
                {SignupForm()}
                {JSON.stringify(values)}
                {`${API}/signup`}
            </Layout>
        </div>
    )
}

export default Signup;