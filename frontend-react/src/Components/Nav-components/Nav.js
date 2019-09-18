// Import NPM packages
import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// Import lokala komponenter
import { Logout } from '../Service/Logout'

export const Nav = (props) => {

    return (
        // Semantic UI kod för att göra en menu med deras css
        <Menu pointing>
            {/* Första valet på nav bar */}
            {/* Innehåller Link från react-router-dom som gör att om den klickas på så kommer du att skickas till det som är 
            definerat i to= (i detta fallet, root) */}
            <Menu.Item as={ Link }
                name='home'
                to=''
            />

            <Menu.Item as={ Link }
                name='friends'
                to='friends'
            />

            <Menu.Item as={ Link }
                name='chat'
                to='chat'
            />

            {/* Samma som första men Semantic UI kod för att få den att hamna på höger sidan */}
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    // On cick, Triggrar logout och skickar med props för att kunna omdirigera användaren där i
                    onClick={e => Logout(props)}
            />
        </Menu.Menu>
    </Menu>
    )
}