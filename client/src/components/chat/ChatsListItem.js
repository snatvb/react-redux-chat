/**
 * Created by snatvb on 17.12.16.
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
//import {connect} from 'react-redux';
//import * as chatUserActions from '../../actions/chatUser';

class ChatListItem extends Component {
    constructor() {
        super();

        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick () {
        const {chat} = this.props;
        //this.props.dispatch(chatUserActions.setChatUser(user));
        browserHistory.push(`/chat/${chat.id}`);
    }

    render() {
        const {chat} = this.props;
        const classNameContainer = this.props.selected ? 'chat-list_item selected' : 'chat-list_item';
        return (
            <div className={classNameContainer} onClick={this.handlerClick}>
                {chat.user.name}
                {chat.user.online && <div className="chat-list_item_online">Онлайн</div>}
            </div>
        );
    }
}

ChatListItem.propTypes = {
    chat: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        user: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default ChatListItem;