import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Segment, Form, List, Button } from 'semantic-ui-react'
import { Nav } from './Nav-components/Nav'
import { getToken } from './Auth-components/AuthHelper'

export const Friends = (props) => {
    const [searchParam, setSearchParam] = useState("")
    const [user, setUser] = useState([])

    const [ currenctUser, setCurrentUser ] = useState({
        id: "",
        username: "",
        friends: [{
            id: "",
            status: ""
        }],
    })


    useEffect(() => {
        searchForm();
    }, []);
        
    const searchForm = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/friends/:id',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        }).then((result) => {
            if (result && result.data) {

                let usernameArray = result.data[0].username
                let userArray = result.data[0].users
                let newUserArray = []

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

                setUser(newUserArray)    
            }                 
        }).catch((err) => {
            console.log(err)
        })
    }


    const addFriend = (friendId) => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/friends/:id',
            headers: {
                authorization: 'Bearer ' + getToken()
            },
            data: {
                friend: friendId
            }
        }).then((result) => {
            searchForm()
        }).catch((err) => {
            console.log(err)
        }) 
    }

    const removeFriend = (friendId) => {
        axios({
            method: 'delete',
            url: 'http://localhost:3001/api/friends/:id',
            headers: {
                authorization: 'Bearer ' + getToken()
            },
            data: {
                friend: friendId
            }
        }).then((result) => {
            searchForm()
        }).catch((err) => {
            console.log(err)
        }) 
    }

    const updateField = e => {
        setSearchParam(e.target.value);
    }

    const renderButtons = (item) => {

        if(currenctUser.friends.map((x) => {
            return x}).indexOf(item) > -1) {
                return (
                    <div >
                    <Button
                        color="red"
                        onClick={removeFriend.bind(this, item)}   
                    >
                    Remove
                    </Button>  
                    </div>
            )
        }

        else {
            return (
                <Button
                    color="green" 
                    onClick={addFriend.bind(this, item)}
                >
                Add
                </Button>  
            )
        }
    }
    
    const allUsers = (items) => {
        return (
            items.map((item) =>  {            
                return (
                    <List.Item key={item.id}>
                        <List.Content floated='right'>
                            {renderButtons(item.id)} 
                        </List.Content>
                        <List.Content>
                            <List.Header >
                                {item.username}
                            </List.Header>
                        </List.Content>
                        
                    </List.Item> 
                )
            })
           
        )
    }

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
                            value={searchParam}
                            onChange={updateField}
                        />
                    </Form>
                </Segment>

                <List divided verticalAlign='middle'>
                    {allUsers(user)}
                </List>

            </div>
        </div>
    )
}
