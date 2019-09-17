import React from 'react'
import { Nav } from './Nav-components/Nav'

export const Welcome = (props) => {

    return (
        <div>
            <div className="nav-header">
                <Nav props={props}/>
            </div>
        </div>
    )
}
