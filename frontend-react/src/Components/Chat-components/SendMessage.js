import React from 'react'

class SendMessage extends React.Component {
    render() {
        return (
            <form className="send-message">
                <input
                    placeholder="Send Message"
                    type="text" />
            </form>
        )
    }
}

export default SendMessage