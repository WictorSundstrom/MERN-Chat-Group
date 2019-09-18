// Import NPM package
import React from 'react'
import io from "socket.io-client";
import axios from 'axios'

// Import Semantic UI för enklare Css
import { Header, Comment, Form, Button, Grid, Icon } from 'semantic-ui-react'

// Import lokala komponenter
import { FriendsList } from './FriendsList'
import { getToken } from '../Auth-components/Auth'

// klass komponent
class Chat extends React.Component {

    // constructor som sköter states
    constructor(props) {
        super(props);

        // Laddar in användarnamnet från personen via deras token
        this.loadUsername();
        // Skapar en ref för att kunna komma längst ner till senaste meddelandena
        this.chatBox = React.createRef();

        //användares state i chat
        this.state = {
            username: '',
            message: '',
            messages: []
        };

        
        // Kopplar till socket.io
        this.socket = io('localhost:3001');
        
        // Skickar tillbaka information från back-end med informationen som kommer tillbaka.
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
        
        // Lägger till meddelandet med datan som kom från server. (meddelande + vem som skrev det)
        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        // Sparar meddelanden ner i databasen
        this.sendMessage = e => {
            e.preventDefault();

            // axios använder http request för att fetcha eller spara data.
            // här 'post' man medelanden från användare
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

                    //skickar medelandet med användarnamn och medelande
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

    // När chat renderas om så ladda in alla meddelanden i databasen
    componentDidMount() {
        this.getChatHistory()
    }
    // När chat uppdateras så starta mostRecentComments
    componentDidUpdate() {
        this.mostRecentComments()
    }

    // Ladda in användarnamn via token 
    loadUsername = () => {
        //här hämtar axios data från användare genom user api och token
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

    // Hämta tidigare meddelanden från databasen
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

    // Går längst ner i chat rutan varje gång den körs
    mostRecentComments = () => {
        this.chatBox.current.scrollTop = this.chatBox.current.scrollHeight;
    };

   //renderar ut alla chat components etc
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
