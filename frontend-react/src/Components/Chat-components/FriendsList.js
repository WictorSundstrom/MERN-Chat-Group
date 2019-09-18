// Import NPM package
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Import Semantic UI för enklare css
import { List } from 'semantic-ui-react'

// Import lokal komponents
import { getToken } from '../Auth-components/Auth'

// funktionell komponent
export const FriendsList = (props) => {
    const [user, setUser] = useState([])

    // Eftersom ComponentDidMount inte finns i funktionell programmering så används useEffect
    // Startar searchForm och sedan sätter [] vilket gör att den kommer inte köras igen, om inte något kallar på den
    useEffect(() => {
        friendsList();
    }, []);

    // Hämtar information från friends/ där id skickas in
    const friendsList = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/friends/:id',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        }).then((result) => {
            if (result && result.data) {
                // Om back-end skickar ett svar som innehåller det jag vill.

                let usernameArray = result.data[0].username
                let userArray = result.data[0].users
                let newUserArray = []
                
                // Loopar igenom alla användare och sedan loopar den för att kolla om Aktiva användaren är vän med honom
                // och sedan kollar om han är Online, är han online. Spara han i en array
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
                //Sparar vänner till den Aktiva användaren där jag bara vill lagra id, username och status
                // för att inte spara lösenord i variabler som används i andra delar av programmet
                setUser(newUserArray)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    // Byter man vänn så loggar den id på den vännen.
    const changeFriend = (friend) => {
        console.log(friend)
    }

    // Skapar en lista på alla vänner som är online
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
            {/* Startar listan */}
                {allUsers(user)}
            </List>
        </div>
    )
}
