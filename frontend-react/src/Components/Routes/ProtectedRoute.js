import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../Auth-components/AuthHelper'
import { Nav } from '../Nav-components/Nav'

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props =>
            getToken() ? (
                <React.Fragment>
                    <Nav {...props} />
                    <Component {...props} />
                </React.Fragment>
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                /> 
            )
        }
    />
)