// import NPM packages
import React from 'react'
import { Redirect } from 'react-router-dom'

// Funktionell komponetn
export const Home = (props) => {

  return (
    // Skickar dig till /welcome
    <Redirect to="/welcome" />
  )
}

