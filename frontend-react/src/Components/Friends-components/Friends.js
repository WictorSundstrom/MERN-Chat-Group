// Import NPM packages
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Import Semantic UI för enklare CSS
import { Segment, Form, List, Button } from 'semantic-ui-react'

// Import lokala komponenter
import { getToken } from '../Auth-components/Auth'

// Funktionell komponent
export const Friends = (props) => {

    // eftersom du inte får göra state i en funktionell så används useState för att ta dess plats
    const [searchParam, setSearchParam] = useState("")
    const [user, setUser] = useState([])

    const [ currentUser, setCurrentUser ] = useState({
        id: "",
        username: "",
        friends: [{
            id: "",
            status: ""
        }],
    })

    // Eftersom ComponentDidMount inte finns i funktionell programmering så används useEffect
    // Startar searchForm och sedan sätter [] vilket gör att den kommer inte köras igen, om inte något kallar på den
    useEffect(() => {
        searchForm();
    }, []);

    // Skickar till back-end med GET, Token som är sparad
    const searchForm = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/friends/:id',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        }).then((result) => {
            if (result && result.data) {
               
                // Får den tillbaka resultat så vill vi få ut Aktiva användaren (username)
                // Och alla användare (users)
                let usernameArray = result.data[0].username
                let userArray = result.data[0].users
                let newUserArray = []
                
                // Sätter den aktiva användaren till state
                setCurrentUser({
                    id: usernameArray._id,
                    username: usernameArray.username,
                    friends: usernameArray.friends
                })
                // Tar ut id och username från varje användare och sparar i en Array (för att inte visa lösenord osv publikt)
                userArray.forEach(newUser => {
                    newUserArray.push({
                        id: newUser._id,
                        username: newUser.username})
                })
                // Sätter alla användare till state
                setUser(newUserArray)    
            }                 
        }).catch((err) => {
            // vid fel logga felet
            console.log(err)
        })
    }

    // När man klickar på add friend, skicka vännens ID och din token. (Detta för att back-enden ska kunna matcha ihop er)
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
            // Om den lyckas så ska den köra searchForm igen
            searchForm()
        }).catch((err) => {
            // Vid fel, logga felet
            console.log(err)
        }) 
    }

    // När man klickar på remove friend, skicka vännens ID och din token. (Detta för att back-enden ska kunna matcha er och ta bort)   
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
            // Kör searchForm för att uppdatera listan
            searchForm()
        }).catch((err) => {
            console.log(err)
        }) 
    }
    // Om något skrivs in i search så ska den uppdateras
    const updateField = e => {
        setSearchParam(e.target.value);
    }
    // Om currentFriend har dig sparad ska en röd knapp med remove renderas ut
    // Annars Add
    const renderButtons = (item) => {

        if(currentUser.friends.map((x) => {
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
    
    // Gör en lista av varje person items
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
            <List size="large" divided verticalAlign='middle'>
            {/* Skickar in state user i allUsers för att skriva ut listan som den hittar */}
                {allUsers(user)}
            </List>
        </div>
    )
}
