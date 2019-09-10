import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../Auth-components/AuthHelper'

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props =>
            getToken() ? (
                <Component {...props} />
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