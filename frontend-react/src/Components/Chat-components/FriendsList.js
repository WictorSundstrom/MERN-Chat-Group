import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List } from 'semantic-ui-react'
import { getToken } from '../Auth-components/AuthHelper'

export const FriendsList = (props) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        friendsList();
    }, []);

    const friendsList = () => {
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

                userArray.forEach(newUser => {
                    if(usernameArray.friends.map((x) => {
                        return x}).indexOf(newUser._id) > -1) {
                            if(newUser.status === 'Online'){
                                newUserArray.push({
                                    id: newUser._id,
                                    username: newUser.username,
                                    status: newUser.status
                            })
                        }
                    }
                })

                setUser(newUserArray)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const changeFriend = (friend) => {
        console.log(friend)
    }

    const allUsers = (items) => {
        return (
            items.map((item) =>  {
                return (
                    <List.Item key={item.id}>
                        <List.Content>
                            <List.Header
                                onClick={changeFriend.bind(this, item)}>
                                {item.username}
                            </List.Header>
                        </List.Content>
                    </List.Item>
                )
            })
        )
    }

    return (
        <div className="friendsList">
            <List
            selection
            divided
            verticalAlign='middle'>
                {allUsers(user)}
            </List>
        </div>
    )
}
