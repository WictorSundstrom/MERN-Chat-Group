import React, { useState } from 'react'
import axios from 'axios'
import { Input, Segment, Form } from 'semantic-ui-react'
import { Nav } from './Nav-components/Nav'

export const Friends = (props) => {
    const [searchParam, setSearchParam] = useState("")
    const [user, setUser] = useState({
        username: [],
        friends: [{
            username: "",
            status: ""
        }],
    })

    const searchForm = e => {
        e.preventDefault();
        
        console.log("In searchform")

        axios({
            method: 'get',
            url: 'http://localhost:3001/friends',
        }).then((result) => {
            if (result && result.data) {

                
                result.data.forEach(data => {
                    console.log(data.friends)

                    setUser([{
                        username: data.username,
                        friends: [{
                            username: data.friends.username,
                            status: data.friends.status
                        }],
                    }])
                    
                })
                
                console.log("user")
                console.log(user)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateField = e => {
        setSearchParam(e.target.value);
    
    }

    return (
        <div>
            <div className="header">
                <Nav props={props}/>
            </div>
            <div className="friends">
            {console.log(searchParam)}
                <Segment basic textAlign='center'>
                    <Form
                        className="search-form"
                        onSubmit={e => searchForm(e)}
                    >
                        <Form.Input
                            className="search-input"
                            action={{ color: 'blue', content: 'Search'}}
                            icon='search'
                            iconPosition='left'
                            placeholder='Username'
                            onChange={updateField}
                        />
                    </Form>
                </Segment>

                <Segment>
                    <p>Hej</p>
                </Segment>

            </div>
        </div>
    )
}