/**
 * Created by snatvb on 17.12.16.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';

@connect(store => {
    return {
        profile: store.profile.profile,
        profileFetched: store.profile.fetched,
        chatUser: store.chatUser.user,
        chatUserFetched: store.chatUser.fetched
    }
}) class Message extends Component {
    myMessage() {
        return this.props.message.user.id === this.props.profile.userId;
    }

    render() {
        const himMeClass = this.myMessage() ? 'me' : 'him';
        const classNameContainer = `chat-content_${himMeClass}-message`;
        const classNameMessage = `chat-content_${himMeClass}-message_message`;
        return (
            <div className={classNameContainer}>
                <div className={classNameMessage}>
                    {this.props.message.text}
                </div>
            </div>
        );
    }
}

Message.propTypes = {
    message: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        user: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired
        }).isRequired,
        text: React.PropTypes.string.isRequired,
        date: React.PropTypes.instanceOf(Date).isRequired
    }).isRequired
};

export default Message;