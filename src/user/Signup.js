import React from "react";
import Layout from "../core/Layout";
import { API } from "../config"

const Signup = () => (
    <div>
        <Layout title="Sigup Page" description="Signup to Node React E-Commerce Website">
            {API}
        </Layout>
    </div>
)

export default Signup;