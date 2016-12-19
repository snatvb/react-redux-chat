/**
 * Created by snatvb on 17.12.16.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
//import * as usersActions from '../../actions/users';
//import * as profileActions from '../actions/profile';
import * as chatsActions from '../../actions/chats';

import ChatsListItem from './ChatsListItem';

//@connect(store => {
//    return {
//        //users: store.users.users,
//        //userFetched: store.users.fetched,
//        chats: store.chats.chats,
//        chatsFetched: store.chats.fetched,
//        profile: store.profile.profile,
//        profileFetched: store.profile.fetched
//    }
//})
class ChatsList extends Component {
    componentWillReceiveProps(nextProps) {
        //nextProps.users.forEach(user => {
        //    this.props.dispatch(chatsActions.addChat(user.id, user));
        //});
        if (!nextProps.chatsFetched) {
            nextProps.dispatch(chatsActions.setChats(nextProps.users));
        }
    }

    renderChatsList() {
        const {chats, profile, selected} = this.props;
        let usersItems = [];
        chats.forEach(chat => {
            //console.log(chat.user.id === profile.userId);
            if (chat.user.id === profile.userId) {
                return null;
            }
            const isSelected = parseInt(selected, 10) === chat.user.id;
            usersItems.push(<ChatsListItem key={chat.id} selected={isSelected} chat={chat} />)
        });
        return usersItems;
    }


    render() {
        let chats = this.renderChatsList();
        return (
            <div className="chat-list">
                {chats}
            </div>
        );
    }
}

ChatsList.propTypes = {
    users: React.PropTypes.array.isRequired
};

export default connect(store => {
    return {
        //users: store.users.users,
        //userFetched: store.users.fetched,
        chats: store.chats.chats,
        chatsFetched: store.chats.fetched,
        profile: store.profile.profile,
        profileFetched: store.profile.fetched
    }
})(ChatsList);
export const undecorated = ChatsList;