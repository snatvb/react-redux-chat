/**
 * Created by snatvb on 17.12.16.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

//import * as chatsActions from '../../actions/chats';

import Message from './Message';
import ChatTextArea from './ChatTextArea';

@connect(store => {
    return {
        profile: store.profile.profile,
        profileFetched: store.profile.fetched,
        chatUser: store.chatUser.user,
        chatUserFetched: store.chatUser.fetched,
        chats: store.chats.chats,
        chatsFetched: store.chats.fetched
    }
}) class ChatMessages extends Component {

    constructor(props) {
        super();

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.chatsFetched || !nextProps.chatUserFetched) {
            browserHistory.push('/chat/');
        }
    }

    getChat() {
        for (var i = 0, max = this.props.chats.length; i < max; i++) {
            var chat = this.props.chats[i];
            if (chat.user.id === this.props.chatUser.id) {
                return chat;
            }
        }
    }

    componentDidUpdate() {
        this.contentMessages.scrollTop = this.contentMessages.scrollHeight;
    }

    getMessages(chat) {
        if(!chat) {
            //browserHistory.push('/chat/');
            return;
        }
        if(!chat.user.online) {
            return (
                <div className="chat-content_no-msg">
                    <span className="chat-content_no-msg_text">
                        Этот парень не онлайн
                    </span>
                </div>
            )
        }
        const messages = chat.messages.map(msg => <Message key={msg.id} message={msg}/>);
        if (messages.length) {
            return messages;
        }
        return (
            <div className="chat-content_no-msg">
                <span className="chat-content_no-msg_text">
                    Здесь пока нет никаких сообщений
                </span>
            </div>
        );
    }

    render() {

        const chat = this.getChat();
        const messages = this.getMessages(chat);

        return (
            <div className="chat-content">
                <div className="chat-content_messages" ref={contentMessages => this.contentMessages = contentMessages}>
                    {messages}
                </div>
                <ChatTextArea socket={this.props.socket} chat={chat}/>
            </div>
        );
    }
}

ChatMessages.propTypes = {
    socket: React.PropTypes.object.isRequired
};

export default ChatMessages;