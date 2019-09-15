import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Segment, Form, List } from 'semantic-ui-react'
import { Nav } from './Nav-components/Nav'
import { getToken } from './Auth-components/AuthHelper'

export const Friends = (props) => {
    const [searchParam, setSearchParam] = useState("")
    const [user, setUser] = useState({ users: [] })

    const [ currenctUser, setCurrentUser ] = useState({
        id: "",
        username: "",
        friends: [{
            username: "",
            status: ""
        }],
    })
   
    const [allUsernames, setAllUsernames] = useState([])

    useEffect(() => {
        searchForm();
    }, []);
        
    const searchForm = () => {
       
        axios({
            method: 'get',
            url: 'http://localhost:3001/friends',
            params: {
                token: getToken()
            }
        }).then((result) => {
            if (result && result.data) {

                let usernameArray = result.data[0].username
                let userArray = result.data[0].users
                let newUserArray = []
                var usernames = [];

                setCurrentUser({
                    id: usernameArray._id,
                    username: usernameArray.username,
                    friends: usernameArray.friends
                })

                userArray.forEach(newUser => {
                    newUserArray.push({
                        id: newUser._id,
                        username: newUser.username})
                })

                newUserArray.forEach(user => {
                    usernames.push(user.username);
                    setUser([...newUserArray])    
                })
                
                console.log(usernames)
                setAllUsernames({usernames})
            }             
              
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateField = e => {
        setSearchParam(e.target.value);
    
    }


   /*  
    const allUsers = (i) => {
            return (
                <List.Item key={i}>
                    <List.Content>
                        <List.Header>{i}</List.Header>
                    </List.Content>
                </List.Item>
            )
    } 
    
    */

var allUsers = Object.keys(allUsernames).map(function(key) {
    return (
        <List.Item value={key}>
            <List.Content>
                <List.Header>{allUsernames[key]}</List.Header>
            </List.Content>
        </List.Item>
    )
    
});


    return (
        <div>
            <div className="header">
                <Nav props={props}/>
            </div>
            <div className="friends">
                <Segment basic textAlign='center'>
                    <Form
                        className="search-form"
                        onSubmit={e => (e)}
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

                <List divided verticalAlign='middle'>
                   {allUsers}
                </List>                
                
            </div>
        </div>
    )
}