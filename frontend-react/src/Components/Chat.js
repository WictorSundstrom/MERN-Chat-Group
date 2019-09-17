import React from 'react'
import { Nav } from './Nav-components/Nav'
import MessageList from './Chat-components/MessageList'
import { FriendsList } from './Chat-components/FriendsList'
//import Search from './Components/Chat-components/Search'


class Chat extends React.Component {

    state = {
        messages: []
    }

    onNewMessage(message) {
        this.setState({
            messages: message
        });
    }

    render(){
        return(
            <div>
                <div className="header">
                    <Nav />
                </div>
                <div className="chat">

                    <FriendsList />
                    <MessageList newMessage={this.state.messages}/>

                </div>
            </div>
        );
    }
}

export default Chat
