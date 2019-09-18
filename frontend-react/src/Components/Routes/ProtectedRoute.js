// Import NPM packages
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// Import lokala komponenter
import { getToken } from '../Auth-components/Auth'
import { Nav } from '../Nav-components/Nav'

// Funktionell komponent, Bryter ut Componenten och sparar resten i en rest variabel
export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props =>
            // Kollar om token finns
            getToken() ? (
                <React.Fragment>
                    
                    {/* Om token finns, Kör detta */}
                    {/* Gör att varje sidan kommer ha Nav och sedan kommer komponenten som skickas med */}
                    {/* Skickar med props tll nav */}
                    <Nav {...props} />
                    <Component {...props} />
               
               {/* Om token inte finns så kommer den köra: Redirect och skicka personen till /login */}
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