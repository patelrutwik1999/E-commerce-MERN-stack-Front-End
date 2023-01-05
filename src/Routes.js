import React from "react";
//Wrap rest of the routes. Makes props available to other nested componenets.
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";

const Routes = () => {
    return (
        //Browser routes makes props available. It wraps all the routes.
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter >
    )
}

export default Routes;