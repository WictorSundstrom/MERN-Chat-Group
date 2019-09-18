// Import NPM packages
import React from 'react'
// Import Semantic UI for easier css
import { Header } from 'semantic-ui-react'

// Funktionell komponent
export const Welcome = (props) => {

    return (
        // Semantic kod för att göra texten större
        <Header size='large'>
            Welcome to our site!
        </Header>
    )
}
