import React from 'react'

//dummy datat for the message list
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

class MessageList extends React.Component {
    render(){
        return(
            <div className="message-list">
                {/*we take dummy data and map it in a arrow function
                message: is the data
                index: is the key */}
                {DUMMY_DATA.map((message, index) => { 
                    return(
                        <div key={index} className="message">
                            {/* message wich is the dummy data text and senderId the user.
                                message(what do we want to get).senderId(where do we get it)*/}
                            <div className="message-username">{message.senderId}</div> 
                            <div className="message-text">{message.text}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MessageList