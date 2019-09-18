// Import npm packcages
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Import local components
import { Home } from './Start-components/Home'
import { Login } from './Login-components/Login'
import { Signup } from './Login-components/Signup'
import { Welcome } from './Start-components/Welcome'
import { Friends } from './Friends-components/Friends'
import Chat from './Chat-components/Chat'
import { ProtectedRoute } from './Routes/ProtectedRoute'

// Class component App
//renderar ut hela applikationen genom komponenter
class App extends React.Component {

    render () {
        return (
            
            // Declares different paths in the site
            <Router>
                <Switch>
                    
                    {/*Normal path that everyone has access to */}
                    <Route exact path="/" component={ Home } />
                    <Route path="/login" component={ Login } />
                    <Route path="/signup" component={ Signup } />
                    
                    {/*Protected path that only those who are logged in has access to */}
                    <ProtectedRoute path="/welcome" component={ Welcome } />
                    <ProtectedRoute path="/friends" component={ Friends } />
                    <ProtectedRoute path="/chat" component={ Chat } />
                    
                    {/* If anything other than the above is not triggered, redirect to / (root) */}
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </Router>
        )
    }
}

export default App
