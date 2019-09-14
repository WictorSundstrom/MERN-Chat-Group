import React, { useState } from 'react'
import axios from 'axios'
import { setToken } from '../Auth-components/AuthHelper';
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Image from '../../img/background.jpg'

export const Login = (props) => {

  
const [user, setUser] = useState({
    username : "",
    password : "",
})

const [userError, setUserError] = useState ({
    inputError : false,
    msgError : false,
    msg : []
})

const [passError, setPassError] = useState ({
    inputError : false,
    msgError : false,
    msg : []
})


const handleFormSubmit = (e) => {
    e.preventDefault()

    axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
            username: user.username,
            password: user.password
        }
    }).then((result) => {
        if (result && result.data && result.data.signedJWT) {
            console.log("Log in successful")
            setToken(result.data.signedJWT)
            props.history.replace({
                pathname : '/Welcome',
                state : {redirected : true }
            });
        }
    }).catch((err) => {
        let userErrorArray = []
        let passErrorArray = []
        
            err.response.data.errors.forEach(errors => {

            if(errors.param === 'username') {
                userErrorArray.push(errors.msg)
            }
            else if(errors.param === 'password') {
                passErrorArray.push(errors.msg)
            }
            else if(errors.param === 'userpass') {
                userErrorArray.push(errors.msg)
                passErrorArray.push(errors.msg)
            }
        })

        if(userErrorArray.length > 0) {
            setUserError({
                inputError : true,
                msgError : true,
                msg : [...userErrorArray]
            }) 
        }
        else {
            setUserError({
                inputError : false,
                msgError : false,
                msg : [...userErrorArray]
            }) 
        }

        if(passErrorArray.length > 0) {
            setPassError({
                inputError : true,
                msgError : true,
                msg : [...passErrorArray]
            })
        }
        else {
            setPassError({
                inputError : false,
                msgError : false,
                msg : [...passErrorArray]
            })
        }

        })    
}

const updateField = e => {
    setUser({
      ...user,
        [e.target.name]: e.target.value
    });
};

const userMessages = userError.msg.map((d) => <Message.List key={d}>{d}</Message.List>);
const passMessages = passError.msg.map((d) => <Message.List key={d}>{d}</Message.List>);


return(
    <div className='login-background'>
        <div className='login-form'>
            <div 
            id="login-top"
            className="ui attached message">
                <div 
                id="login-header"
                className="header">
                <h1>Login</h1>
                </div>
            </div>
                <Segment id="login-segment">
                <Form onSubmit={e => handleFormSubmit(e)}>
                    <Form.Input 
                        label="Username"
                        id="user"
                        value={user.username}
                        placeholder="Username"
                        name="username"
                        onChange={updateField}
                        error={userError.inputError}
                    />
                    <Message
                    negative
                    error={!userError.msgError}
                    >
                        <Message.Header>Username error</Message.Header>
                        {userMessages}
                    </Message>


                    <Form.Input
                        label="Password"
                        id="pass"
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        name="password"
                        onChange={updateField}
                        error={passError.inputError}
                    />
                    <Message
                    negative
                    error={!passError.msgError}
                    >
                        <Message.Header>Password error</Message.Header>
                        {passMessages}
                    </Message>

                    <Button className="ui button"
                        id="formSubmit"
                        type="submit"
                        value="Login"
                        onSubmit={handleFormSubmit}
                    >Submit!
                    </Button>
                </Form>
            </Segment>
            <div 
            id="login-bottom"
            className="ui bottom attached warning message">
                    <i className="icon help"></i>
                    Not Registered? <Link to="/signup">Register here!</Link>
            </div>
        </div>
    </div>
    )
}
