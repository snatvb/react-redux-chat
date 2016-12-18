/**
 * Created by snatvb on 18.12.16.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon} from 'react-bootstrap';

//import * as chatsActions from '../../actions/chats';


@connect(store => {
    return {
        profile: store.profile.profile,
        profileFetched: store.profile.fetched,
        chatUser: store.chatUser.user,
        chatUserFetched: store.chatUser.fetched,
        chats: store.chats.chats,
        chatsFetched: store.chats.fetched
    }
}) class ChatTextArea extends Component {
    constructor() {
        super();

        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.handleBtnSend = this.handleBtnSend.bind(this);
    }

    componentDidMount() {
        this.areaMessage.focus();
    }

    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            this.send();
        }
    }

    handleBtnSend() {
       this.send();
    }

    send() {
        let text = this.areaMessage.innerText.trim();
        if (text === '' || !(this.props.chat && this.props.chat.user.online)) {
            return;
        }

        this.props.socket.emit('send message', {userId: this.props.chatUser.id, message: text});
        //this.props.dispatch(chatsActions.addMessage(this.props.chatUser, {
        //    id: this.props.profile.userId,
        //    name: this.props.profile.userName
        //}, text));
        this.areaMessage.innerText = '';
    }

    render() {
        return (
            <div className="chat-content_textarea-container">
                <div className="row">
                    <div className="col-xs-9">
                        <div className="chat-content_textarea"
                             contentEditable={this.props.chat ? "true" : "false"}
                             onKeyPress={this._handleKeyPress}
                             ref={(inputMessage) => { this.areaMessage = inputMessage; }}></div>
                    </div>
                    <div className="col-xs-3 text-right">
                        <Button className="chat-content_btn-send" onClick={this.handleBtnSend}><Glyphicon glyph="send" /></Button>
                    </div>
                </div>

            </div>
        );
    }
}

ChatTextArea.propTypes = {
    socket: React.PropTypes.object.isRequired,
    chat: React.PropTypes.object
};

export default ChatTextArea;