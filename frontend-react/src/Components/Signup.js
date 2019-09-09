import React, { Component } from 'react'
import axios from 'axios'    
import { setToken } from './AuthHelper';


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
            <div className='signup-form bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5' style={{width: 770}}>
                <form
                    onSubmit={e => this.handleFormSubmit(e)}>

                    <label htmlFor="user">
                    <h2>Username</h2>
                    <input
                        id="user"
                        type="text"
                        value={this.state.user}
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
                        value={this.state.pass}
                        placeholder="Password"
                        name="pass"
                        onChange={this.handleChange}
                    />
                    </label>

                    <label htmlFor="passAgain">
                    <h2>Repeat Password</h2>
                    <input
                        id="passAgain"
                        type="password"
                        value={this.state.passwordAgain}
                        placeholder="Repeat Password"
                        name="passAgain"
                        onChange={this.handleChange}
                    />
                    </label>
                    <input
                        id="formSubmit"
                        type="submit"
                        value="Signup"
                        onSubmit={e => {this.handleFormSubmit(e)}}
                    >
                    </input>

                    <label
                        id="warningText"
                    />
                    
                </form>
            </div>
        )
    }
}

export default Signup