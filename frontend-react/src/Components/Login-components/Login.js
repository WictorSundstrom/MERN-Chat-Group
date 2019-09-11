import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { setToken } from '../Auth-components/AuthHelper';
import { Link } from 'react-router-dom'
import { Button, Form, Message } from 'semantic-ui-react'

export const Login = (props) => {

    
const [user, setUser] = useState("")
const [pass, setPass] = useState("")
const [userError, setUserError] = useState(false)
const [userMsgError, setUserMsgError] = useState(false)
const [passError, setPassError] = useState(false)
const [passMsgError, setPassMsgError] = useState(false)
const [submitted, setSubmitted] = useState(false)


useEffect(() => {
    if(submitted)
    {   
        if( user.length < 6 ) {
            setUserMsgError(true)
            console.log("userError " + userMsgError)
        }
        else{
            setUserMsgError(false)
            setUserError(false)
            console.log("userError " + userMsgError)
        }

        if( pass.length < 6) {
            setPassMsgError(true)
            console.log("passError " + passMsgError)
        }
        else{
            setPassMsgError(false)
            setPassError(false)
            console.log("passError " + passMsgError)
        }
    }
}, [user.length, userMsgError, pass.length,passMsgError, submitted])

const handleFormSubmit = (e) => {
    e.preventDefault()

    setSubmitted(true)
    
    if( user.length < 6 || pass.length  < 6) {
        if( user.length < 6 ){
            setUserError(true)
        }
        if( pass.length < 6 ){
            setPassError(true)
        }
        
    }
    else if(!userError && !passError)
    {  
        console.log("No errors in userError and passError")
        axios({
            method: 'post',
            url: 'http://localhost:3001/login',
            data: {
                username: user,
                password: pass
            }
        }).then((result) => {
            if (result && result.data && result.data.signedJWT) {
                console.log("Log in successful")
                setToken(result.data.signedJWT)
                props.history.replace('/Welcome');
            }
        })
    }
}

return(
    <div className='login-form'>
     <div className="ui attached message">
            <div className="header">
                Welcome to our site!
            </div>
            <p>Fill out the form below to login</p>
        </div>
        <Form onSubmit={e => handleFormSubmit(e)}>
            <Form.Input 
                label="Username"
                id="user"
                value={user}
                placeholder="Username"
                name="user"
                onChange={e => setUser(e.target.value)}
                error={userError}
            />
                   
            <Message
                className="ui negative message"
                error={!userMsgError}
                header='Too short usernamer'
                content='Username does not have atleast 6 letters'
            />
                <Form.Input
                    label="Password"
                    id="pass"
                    type="password"
                    value={pass}
                    placeholder="Password"
                    name="pass"
                    onChange={e => setPass(e.target.value)}
                    error={passError}
                />
                <Message
                    className="ui negative message"
                    error={!passMsgError}
                    header='Too short password'
                    content='Password does not have atleast 6 letters'
                />
                <Button className="ui button"
                    id="formSubmit"
                    type="submit"
                    value="Login"
                    onSubmit={e => {e.preventDefault()
                        }
                    }
                >Submit!
                </Button>
            </Form>
            <div className="ui bottom attached warning message">
                <i className="icon help"></i>
                Not Registered? <Link to="/signup">Register here!</Link>
            </div>
            
        </div>
        )
    }



/*
class Login extends Component {

    state = {
        user : '',
        pass : '',
        userError : false,
        passError : false,
        passwordMatchError : false,
        formError : false
    }

    handleFormSubmit(e) {
        e.preventDefault()
        if(this.state.user.length === 0 || this.state.pass.length === 0) {
            if( this.state.user.length === 0 ){
                this.setState({ userError : true })
            }
            if( this.state.pass.length === 0 ){
                this.setState({ passError : true })
            }
        }
        else if(!this.state.usernameError && !this.state.passwordError)
        {  
            axios({
                method: 'post',
                url: 'http://localhost:3001/login',
                data: {
                    username: this.state.user,
                    password: this.state.pass
                }
            }).then((result) => {
                if (result && result.data && result.data.signedJWT) {
                    console.log("Log in successful")
                    setToken(result.data.signedJWT)
                    this.props.history.replace('/Welcome');
                }
            })
        }
    }


    handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        this.setState({[name]: value}, this.handleError(name, value))   
        
    }
    
    handleError = (name, value) => {
        
       // let value = e.target.value
       // let name = e.target.name
        
        let errorName = name+"Error"

        
        console.log(errorName)
        console.log(value.length)


        if( value.length > 0) {
            this.setState({[errorName] : true}, )
            console.log("userError " + this.state.userError)
            console.log("passError " +  this.state.passError)
        }
        else{
            this.setState({[errorName] : false})
            
            console.log("userError " + this.state.userError)
            console.log("passError " + this.state.passError)
        }
    }    

    render() {
        return(
            <div className='login-form'>
                <Form onSubmit={e => this.handleFormSubmit(e)}>
                    <Form.Input 
                        label="Username"
                        id="user"
                        value={this.state.username}
                        placeholder="Username"
                        name="user"
                        errorname="usernameError"
                        onChange={
                            this.handleChange
                        }
                        error={this.state.usernameError}
                    />
                   
                   <Message
                        error={!this.state.usernameError}
                        header='Too short usernamer'
                        content='Username does not have atleast 6 letters'
                    />
                    <Form.Input
                        label="Password"
                        id="pass"
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        name="pass"
                        errorname="passwordError"
                        onChange={this.handleChange}
                        error={this.state.passwordError}
                    />
                    <Message
                        error={!this.state.passwordError}
                        header='Too short password'
                        content='Password does not have atleast 6 letters'
                    />
                    <Button className="ui button"
                        id="formSubmit"
                        type="submit"
                        value="Login"
                        onSubmit={e => {e.preventDefault()
                            }
                        }
                    >Submit!
                    </Button>
                  </Form>
                <Link to="/signup">Not Registered?</Link>
                </div>
        )
    }
}

export default Login

*/