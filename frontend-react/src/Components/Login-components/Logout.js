import React from 'react'
import { Redirect } from 'react-router-dom'
import { logout } from '../Auth-components/AuthHelper';

export const Logout = () => {
    return (
        logout(),
        <Redirect to="/login" />
    )
}