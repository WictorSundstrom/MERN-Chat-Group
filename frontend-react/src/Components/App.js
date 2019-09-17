import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Home } from './Home'
import { Login } from './Login-components/Login'
import { Signup } from './Login-components/Signup'
import Chat from './Chat'
import { Welcome } from './Welcome'
import { Friends } from './Friends'
import { ProtectedRoute } from './Routes/ProtectedRoute'

class App extends React.Component {

    render () {
        return (
            <Router>
                    <Route exact path="/" component={ Home } />
                    <Route path="/login" component={ Login } />
                    <Route path="/signup" component={ Signup } />
                    <ProtectedRoute path="/welcome" component={ Welcome } />
                    <ProtectedRoute path="/chat" component={ Chat } />
                    <ProtectedRoute path="/friends" component={ Friends } />
            </Router>
        )
    }
}

export default App
