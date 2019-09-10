import React from 'react'
import MessageList from './Chat-components/MessageList'
import SendMessage from './Chat-components/SendMessage'
import FriendsList from './Chat-components/FriendsList'
//import Search from './Components/Chat-components/Search'


class Chat extends React.Component {


    render(){
        return(
            
            <div className="chat">

                <FriendsList />
                <MessageList />
                <SendMessage />


            </div>
        );
    }
}

export default Chat
