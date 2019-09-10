import React, { Component } from 'react'
import axios from 'axios'    
import { Button, Form } from 'semantic-ui-react'


class Signup extends Component {
    
    state = {
        user : "",
        pass : "",
        passAgain : "",
    }
        
    handleFormSubmit(e) {
        e.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/signup',
            data: {
                username: this.state.user,
                password: this.state.pass
            }
        }).then((result) => {
            if (result && result.data && result.data.signedJWT) {
                console.log("Signed up successful")
                this.props.history.replace('/');
            }
        }).catch((error) => {
            console.log(error)
             
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    

    render() {
        return(
            <div className='signup-form' >
                <Form onSubmit={e => this.handleFormSubmit(e)}>
                    <Form.Input 
                        label="Username"
                        id="user"
                        value={this.state.username}
                        placeholder="Username"
                        name="user"
                        onChange={this.handleChange}
                    />
                   
                    <Form.Input
                        label="Password"
                        id="pass"
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        name="pass"
                        onChange={this.handleChange}
                    />
                    
                   
                    <Form.Input
                        label="Repeat Password"
                        id="passAgain"
                        type="password"
                        value={this.state.passwordAgain}
                        placeholder="Password"
                        name="passAgain"
                        onChange={this.handleChange}
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
            </div>
        )
    }
}

export default Signup