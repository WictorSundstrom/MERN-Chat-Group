// Import NPM packages
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Import lokala komponenter
import { Button, Form, Message, Segment } from 'semantic-ui-react'

// Funktionell komponent
export const Signup = (props) => {

// eftersom du inte får göra state i en funktionell så används useState för att ta dess plats
const [user, setUser] = useState({
    username : "",
    password : "",
    passwordConfirmation : ""
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

const [passConfirmationError, setPassConfirmationError] = useState ({
    inputError : false,
    msgError : false,
    msg : []
})

// När forumet submitas så skickar den användarnamn och lösenord till back-end
const handleFormSubmit = (e) => {
    e.preventDefault()

    axios({
        method: 'post',
        url: 'http://localhost:3001/signup',
        data: {
            username: user.username,
            password: user.password,
            passwordConfirmation: user.passwordConfirmation
        }
        // Kollar resultatet från back-end, Kollar om den har data och en JWT i sig.
    }).then((result) => {
        if (result && result.data && result.data.signedJWT) {
            console.log("Register successful")
            // Skickar användaren till /login sidan
            props.history.replace({
                pathname : '/login'
            });
        }
    }).catch((err) => {
        // Vid fel
        let userErrorArray = []
        let passErrorArray = []
        let passConfirmationErrorArray = []

        // Kolla vad felet innehåller och spara i rätt array.
        err.response.data.errors.forEach(errors => {

            if(errors.param === 'username') {
                userErrorArray.push(errors.msg)
            }
            else if(errors.param === 'password') {
                passErrorArray.push(errors.msg)
            }
            else if(errors.param === 'passwordConfirmation') {
                passConfirmationErrorArray.push(errors.msg)

                if(errors.msg === 'Passwords does not match') {
                    passErrorArray.push(errors.msg)
                    }
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

        if(passConfirmationErrorArray.length > 0) {
            setPassConfirmationError({
                inputError : true,
                msgError : true,
                msg : [...passConfirmationErrorArray]
            })
        }
        else {
            setPassConfirmationError({
                inputError : false,
                msgError : false,
                msg : [...passConfirmationErrorArray]
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
const passConfirmMessages = passConfirmationError.msg.map((d) => <Message.List key={d}>{d}</Message.List>);


return(
    <div className='signup-background'>
        <div className='signup-form'>
            <div 
            id="signup-top"
            className="ui attached message">
                <div 
                id="signup-header"
                className="header">
                    <h1>Sign up</h1>
                </div>
            </div>
            <Segment id="signup-segment">
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

                    <Form.Input
                        icon='lock'
                        label="Repeat Password"
                        id="passAgain"
                        type="password"
                        value={user.passwordConfirmation}
                        placeholder="Password"
                        name="passwordConfirmation"
                        onChange={updateField}
                        error={passConfirmationError.inputError}
                    />
                    <Message
                    negative
                    error={!passConfirmationError.msgError}
                    >
                        <Message.Header>Password confirmation error</Message.Header>
                        {passConfirmMessages}
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
            id="signup-bottom"
            className="ui bottom attached warning message">
                    <i className="icon help"></i>
                    Already signed up? <Link to="/login">Login here!</Link>
            </div>
        </div>
    </div>
    )
}