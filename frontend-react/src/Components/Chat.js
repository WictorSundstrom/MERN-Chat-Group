import React from 'react'
import io from "socket.io-client";
import axios from 'axios'
import { Header, Comment, Form, Button, Grid, Icon } from 'semantic-ui-react'
import { FriendsList } from './Chat-components/FriendsList'
import { getToken } from './Auth-components/AuthHelper'


class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.loadUsername();
        this.chatBox = React.createRef();

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        

        this.socket = io('localhost:3001');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = e => {
            e.preventDefault();

            axios({
                method: 'post',
                url: 'http://localhost:3001/api/chat',
                headers: {
                    authorization: 'Bearer ' + getToken()
                },
                data: {
                    author: this.state.username,
                    message: this.state.message,
                }
            }).then(result => {
                if (result) {

                    this.socket.emit('SEND_MESSAGE', {
                        author: this.state.username,
                        message: this.state.message,
                    });

                    this.setState({message: ''})
                }
            }).catch(err => {
                console.log(err)
            });
        }
    }

    componentDidMount() {
        this.getChatHistory()
    }
    componentDidUpdate() {
        this.mostRecentComments()
    }

   
    loadUsername = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/user',
            headers: {
                authorization: 'Bearer ' + getToken()
            } 
        }).then(result => {
            this.setState({ username: result.data.username})
        })
    }

    getChatHistory() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/chat',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        }).then((result) => {
            if (result && result.data) {
                result.data.forEach(savedMessage => {
                    this.setState({
                        messages: [...this.state.messages, savedMessage]
                    })
                })
                this.mostRecentComments();
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    mostRecentComments = () => {
        this.chatBox.current.scrollTop = this.chatBox.current.scrollHeight;
    };

   
    render(){
        return (
            <Grid columns='equal'>
                <Grid.Column width={5}>
                    <br></br>
                    <div className="chat-friends">
                        <Header size='large'>
                            Online Friends
                        </Header>
                        
                        <FriendsList />
                    </div>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Comment.Group>
                    <br></br>
                        <Header as='h3' dividing>
                            Chat
                        </Header>
                    
                        <Comment>
                            <div className="chatBox" ref={this.chatBox}>
                                {this.state.messages.map(message => {
                                    return (
                                        <Comment.Content>
                                            <Comment.Author>{message.author}</Comment.Author>
                                            <Comment.Text>{message.message}</Comment.Text>
                                        </Comment.Content>
                                    )
                                })}
                            </div>
                        </Comment>
                    
                        <Form reply>
                            <Form.TextArea placeholder='Message...' className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                            <Button icon='edit' content='Add Reply'  labelPosition='left' primary onClick={this.sendMessage} className="btn btn-primary form-control"/>
                        </Form>
                    </Comment.Group>
                </Grid.Column>
                <Grid.Column width={3}>
                    <br></br>
                    <Header size='medium'>
                    <Icon name='warning sign'/>
                        Private chat under construction
                    </Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Chat
