import React from 'react'
import MessageList from './Chat-components/MessageList'
import SendMessage from './Chat-components/SendMessage'
import FriendsList from './Chat-components/FriendsList'
import { Nav } from './Nav-components/Nav'
//import Search from './Components/Chat-components/Search'


export const Chat = (props) => {

    return(
        <div>
            <div className="header">
                <Nav props={props} />
            </div>
            <div className="chat">
                <FriendsList />
                <MessageList />
                <SendMessage />
            </div>
        </div>
    );
}

