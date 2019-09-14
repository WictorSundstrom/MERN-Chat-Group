import React from 'react'
import { Nav } from './Nav-components/Nav'

class Friends extends React.Component {

    render() {
        return (
            <div>
                <div className="header">
                    <Nav />
                </div>
                <div className="friends">
                    Friends
                </div>
            </div>

        )
    }
}

export default Friends