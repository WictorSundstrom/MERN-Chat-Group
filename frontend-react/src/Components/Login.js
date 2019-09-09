import React, { Component } from 'react'
import axios from 'axios'
import { setToken } from './AuthHelper';
import { Link } from 'react-router-dom'

class Login extends Component {

    state = {
        user : '',
        pass : '',
    }

    handleFormSubmit(e) {
        e.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/login',
            data: {
                username: this.state.user,
                password: this.state.pass
            }
        }).then((result) => {
            if (result && result.data && result.data.signedJWT) {
                console.log("inuti then")
                setToken(result.data.signedJWT)
                this.props.history.replace('/');
            }
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        return(
            <div className='login-form bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5' style={{width: 770}}>
                <form
                    onSubmit={e => this.handleFormSubmit(e)}>

                        <label htmlFor="user">
                        <h2>Username</h2>
                        <input
                            id="user"
                            value={this.state.username}
                            placeholder="Username"
                            name="user"
                            onChange={this.handleChange}
                        />

                        </label>

                        <label htmlFor="pass">
                        <h2>Password</h2>
                        <input
                            id="pass"
                            type="password"
                            value={this.state.password}
                            placeholder="Password"
                            name="pass"
                            onChange={this.handleChange}
                        />
                        </label>

                        <label
                            id="warningText"
                        />

                    <input
                        id="formSubmit"
                        type="submit"
                        value="Login"
                        onSubmit={e => {e.preventDefault()
                            }
                        >
                        </input>
                    </form>
            </div>

            <div>
                <Link to="/signup">Not Registered?</Link>
            </div>
        </div>

        )
    }
}

export default Login
