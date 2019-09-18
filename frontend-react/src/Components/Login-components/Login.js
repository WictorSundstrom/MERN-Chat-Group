// Import NPM packages
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Import Semantic UI för enklare CSS
import { Button, Form, Message, Segment } from 'semantic-ui-react'

// Import lokala komponenter
import { setToken } from '../Auth-components/Auth';

// Funktionell komponent
export const Login = (props) => {

// eftersom du inte får göra state i en funktionell så används useState för att ta dess plats
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

// När forumet submitas så skickar den användarnamn och lösenord till back-end
const handleFormSubmit = (e) => {
    e.preventDefault()

    axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
            username: user.username,
            password: user.password
        }
    // Kollar resultatet från back-end, Kollar om den har data och en JWT i sig.
    }).then((result) => {
        if (result && result.data && result.data.signedJWT) {
            console.log("Log in successful")
            
            // Sätter sessionStorage till den JWT jag fick tillbaka
            setToken(result.data.signedJWT)
            
            console.log(props)
            
            // Skickar användaren till /Welcome sidan
            props.history.replace({
                pathname : '/Welcome'
            });
        }
    }).catch((err) => {
        
        // Vid fel
        let userErrorArray = []
        let passErrorArray = []
        
        // Kolla vad felet innehåller och spara i rätt array.
        err.response.data.errors.forEach(errors => {

            //om användare är fel
            if(errors.param === 'username') {
                userErrorArray.push(errors.msg)
            }
            //om lösenord är fel
            else if(errors.param === 'password') {
                passErrorArray.push(errors.msg)
            }
            
            else if(errors.param === 'userpass') {
                userErrorArray.push(errors.msg)
                passErrorArray.push(errors.msg)
            }
        })
        
        // Om Arrayen har fel så ska den ändra booleans till true och visa vilket fel
        if(userErrorArray.length > 0) {
            setUserError({
                inputError : true,
                msgError : true,
                msg : [...userErrorArray]
            }) 
        }
        // Annars false och fel visas inte 
        // (För att om du t.ex. skriver för kort användarnamn 
        // och sedan skickar igen med en okej så ska den inte fortsätta visa fel
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
// Uppdaterar State user på variabelen som har namnet som aktiverade updateringen och sedan uppdaterar värdet med värdet som skrivs in.
const updateField = e => {
    setUser({
      ...user,
        [e.target.name]: e.target.value
    });
};

// Loopar igenom alla felen och skriver ut det
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
                        icon='user'
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
                        icon='lock'
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
