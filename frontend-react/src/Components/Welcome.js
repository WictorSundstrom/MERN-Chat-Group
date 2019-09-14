import React from 'react'
import { Nav } from './Nav-components/Nav'

class Welcome extends React.Component {

    render() {
        return (
            <div>
                <div className="header">
                    <Nav />
                </div>
            </div>
        )
    }
}

export default Welcome