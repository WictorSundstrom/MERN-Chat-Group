import React from 'react'
import MessageList from './Chat-components/MessageList'
import SendMessage from './Chat-components/SendMessage'
//import FriendsList from './Chat-components/FriendsList'
import { Nav } from './Nav-components/Nav'

export const Chat = (props) => {


    return(
        <div>
            <div className="header">
                <Nav props={props} />
            </div>

            
            <MessageList />
            <SendMessage />
         
        </div>
    );
}

/*   <div className="">
                <FriendsList />
                <MessageList />
                <SendMessage />
            </div> */