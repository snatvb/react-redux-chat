/**
 * Created by snatvb on 17.12.16.
 */


import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import ChatList from './ChatsList';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

import * as profileActions from '../../actions/profile';
import * as chatUserActions from '../../actions/chatUser';
import * as chatsActions from '../../actions/chats';
import * as usersActions from '../../actions/users';

import ChatMessages from './ChatMessages';

import '../../scss/chat.scss';


@connect((store) => {
    return {
        profile: store.profile.profile,
        profileFetched: store.profile.fetched,
        users: store.users.users,
        usersFetched: store.users.fetched,
        chatUser: store.chatUser.user,
        chatUserFetched: store.chatUser.fetched
    }
}) class Chat extends Component {
    constructor(props) {
        super();

        if (!props.profileFetched) {
            browserHistory.push('/');
        }
        //props.params.userId
        //console.log(props.profileFetched);
        //console.log(props.params.userId);
        this.exitChat = this.exitChat.bind(this);

    }

    componentWillMount() {
        this.socket = io('', {path: ''});
        this.props.dispatch(usersActions.getUsers());
    }
    componentDidMount() {
        const props = this.props;

        this.socket.on('update users', users => {
            props.dispatch(chatsActions.setChats(users));
            //props.dispatch(usersActions.updateUsers(users))
        });

        this.socket.on('register error', () => this.exitChat());
        this.socket.on('reconnect', () => this.registerUser());

        this.socket.on('new message', data => {
            this.props.dispatch(chatsActions.addMessage(data.user, data.msgOwn, data.message));
        });

        this.registerUser();
    }

    registerUser() {
        this.socket.emit('register', this.props.profile.userId);
    }

    getChatUserId(props) {
        if (!props.params.userId) {
            return;
        }
        const userId = parseInt(props.params.userId, 10);
        if (isNaN(userId)) {
            browserHistory.push('/chat');
        }
        return userId;
    }

    setUserChat(users, userId) {

        let setUser;

        for (var i = 0, max = users.length; i < max; i++) {
            let user = users[i];
            if (userId === user.id) {
                setUser = user;
                break;
            }
        }

        if (setUser) {
            this.props.dispatch(chatUserActions.setChatUser(setUser));
        } else if (typeof userId === 'number') {
            browserHistory.push('/chat');
        }
    }


    exitChat() {
        this.socket.disconnect();
        this.props.dispatch(profileActions.logout());
        browserHistory.push('/');
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    componentWillReceiveProps(nextProps) {
        const userId = this.getChatUserId(nextProps);
        if (!nextProps.chatUserFetched || nextProps.chatUser.id !== userId) {
            this.setUserChat(nextProps.users, userId);
        }

    }

    render() {
        const { /*profile,*/ users } = this.props;
        const welcomeContent = (
            <div className="chat_content">
                Добро пожаловать в snChat! <br/>
                Выберите собеседника из списка справа.
                Если он онлайн, то вы сможете отправлять и получать сообщения.
            </div>
        );

        return (
            <div>
                <div className="chat">
                    <div className="chat_parent-side">
                        <div className="chat_side__left">
                            <ChatList users={users} selected={this.props.params && this.props.params.userId}/>
                        </div>
                        <div className="chat_side__right">
                            {this.props.params.userId ? <ChatMessages socket={this.socket} /> : welcomeContent}
                        </div>
                    </div>
                </div>
                <div className="chat_exit">
                    <Button onClick={this.exitChat}>Выйти</Button>
                </div>
            </div>
        );
    }
}

export default Chat;