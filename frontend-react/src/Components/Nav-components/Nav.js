import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export const Nav = () => {
    
    const [activeItem, setActiveItem] = useState('')
      
    return (
        <Menu pointing>
            <Menu.Item as={ Link }
                name='home'
                to=''
                active={activeItem === 'home'}
                onClick={e => setActiveItem(e.target.name)}
            />
           
            <Menu.Item as={ Link }
                name='chat'
                to='chat'
                active={activeItem === 'chat'}
                onClick={e => setActiveItem(e.target.name)}
            />


            <Menu.Item as={ Link }
                name='friends'
                to='friends'
                active={activeItem === 'friends'}
                onClick={e => setActiveItem(e.target.name)}
            />

            <Menu.Menu position='right'>
                <Menu.Item as={ Link }
                    name='logout'
                    to='logout'
                    active={activeItem === 'logout'}
                    onClick={e => setActiveItem(e.target.name)}
                />
        </Menu.Menu>
    </Menu>
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