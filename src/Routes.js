import React from "react";
//Wrap rest of the routes. Makes props available to other nested componenets.
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/userDashboard";
import AdminDashboard from "./user/adminDashboard"
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

const Routes = () => {
    return (
        //Browser routes makes props available. It wraps all the routes.
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path='/shop' exact component={Shop}></Route>
                <Route path='/cart' exact component={Cart}></Route>
                <Route path='/product/:productId' exact component={Product}></Route>

                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/create/product" exact component={AddProduct}></AdminRoute>
            </Switch>
        </BrowserRouter >
    )
}

export default Routes;