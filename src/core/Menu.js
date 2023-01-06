import React, { Fragment } from "react";
//WithRouter to access props history
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/index'

//History will have the current path
//Path will have the path being passed
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: 'white' }
    }
}

const Menu = ({ history }) => (<div>
    <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                    Dashboard
                </Link>
            </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    Dashboard
                </Link>
            </li>
        )}

        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Signin</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
                </li>
            </Fragment>
        )
        }

        {isAuthenticated() &&
            <Fragment>
                <li className="nav-item">
                    <span className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => signout(() => {
                        history.push("/");
                    })}>Signout</span>
                </li>
            </Fragment>
        }
    </ul>
</div>
)

export default withRouter(Menu)