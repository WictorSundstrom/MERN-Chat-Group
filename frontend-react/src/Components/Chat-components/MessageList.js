import React from 'react'
import SendMessage from './SendMessage'

const DUMMY_DATA = [
    {
        senderId: 'Jörgen',
        text: 'Hey, how is it going?'
    },
    {
        senderId: 'janedoe',
        text: 'Great! How about you?'
    },
    {
        senderId: 'Jörgen',
        text: 'Good to hear! I am great as well'
    }
]

function MessageList (props) {
    
        return(
            
                DUMMY_DATA.map((message, index) => { 
                    return(
                        <div className="message">
                            {/* message wich is the dummy data text and senderId the user.
                            message(what do we want to get).senderId(where do we get it)*/}
                            <div className="message-username">{message.senderId}</div> 
                            <div className="message-text">{message.text}</div>
                        </div>
                    )
                })
            
        );
    }


export default MessageList





