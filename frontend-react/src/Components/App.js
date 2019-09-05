import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Chat from './Chat'
import { Nav } from './Nav'



class App extends React.Component {

    state = {
        categorySelected : 0,
    }

    onCategoryChange = selectedCat => {
        console.log("selected category: " + selectedCat)
        this.setState({
            categorySelected : selectedCat
        })
    }

    render () {
        return (
            <Router>
                <Fragment>
                   <Nav selectedCat={this.state.categorySelected} onSelect={this.onCategoryChange}/>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/signup" component={ Signup } />
                    <Route exact path="/chat" component={ Chat } /> {/*for testing */}
                </Fragment>
            </Router>
        )
    }
}

export default App
