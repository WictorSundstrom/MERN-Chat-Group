import React from 'react';
import { Link } from "react-router-dom";
import { getToken } from '../Auth-components/AuthHelper'
import '../Nav.css'


export const Nav = () => {
    if(getToken() === null) {
        
        return (<LoggedOutNav />)
    }
    else {
        
        console.log("loggedout trigger")
        return (<LoggedInNav />)
    }
}

export const LoggedOutNav = () => {

    return (
        
            <ul>
                <li> <Link to="/login" className="nav-link">Login</Link> </li>
            </ul>
    )
}

export const LoggedInNav = () => {

    return (
        <ul>
            <li>
                <li> <Link to="/" className="nav-link active"> Home </Link> </li>
                <li> <Link to="/chat" className="nav-link"> Chat </Link> </li>
                <li> <Link to="/friends" className="nav-link"> Friends </Link></li>
            </li>
        </ul>
    )
}
            /*  Fungerar!

                import Paper from '@material-ui/core/Paper';
                import Tabs from '@material-ui/core/Tabs';
                import Tab from '@material-ui/core/Tab';

                import { getToken } from "./AuthHelper"


                <Paper>
            <Tabs
                value={selectedCat}
                onChange={(event, index) =>
                {
                    if(index === 2 && getToken() === null) {
                        index = 1
                    }
                    
                    onSelect(index)
                }}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
               <Tab label="Home" component={Link} to="/" />
               <Tab label="Login" component={Link} to="/login" />
               <Tab label="Chat" component={Link} to="/chat" />  

               
            </Tabs>
        </Paper>
            */