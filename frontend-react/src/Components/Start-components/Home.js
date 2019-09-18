// import NPM packages
import React from 'react'
import { Redirect } from 'react-router-dom'

// Funktionell komponent
export const Home = (props) => {

  return (
    // Skickar dig till /welcome
    <Redirect to="/welcome" />
  )
}

