/**
 * Created by snatvb on 17.12.16.
 */

import * as actionTypes from '../reducers/actionTypes/chats';

const {ADD_CHAT_REJECT,
    ADD_CHAT_FULFILLED,
    SET_CHATS_REJECT,
    SET_CHATS_FULFILLED,
    ADD_MESSAGE_FULFILLED,
    ADD_MESSAGE_REJECT} = actionTypes;

export function addChat (id, user, messages = []) {
    if (typeof id !== 'number' || typeof user !== 'object') {
        return {
            type: ADD_CHAT_REJECT,
            message: 'Wrong arguments in actions chats'
        }
    }
    return {
        type: ADD_CHAT_FULFILLED,
        id: user.id,
        user,
        messages
    }
}
export function addMessage (user, userProfile, text) {
    if (typeof text !== 'string' || typeof user !== 'object' || typeof userProfile !== 'object') {
        return {
            type: ADD_MESSAGE_REJECT,
            message: 'Wrong user or text or userProfile'
        }
    }
    return {
        type: ADD_MESSAGE_FULFILLED,
        id: (new Date()).getTime(),
        date: new Date(),
        userProfile,
        user,
        text
    }
}
export function setChats (users) {
    if (!Array.isArray(users)) {
        return {
            type: SET_CHATS_REJECT,
            message: 'Wrong arguments in actions chats (addChats)'
        }
    }

    if(!users.length) {
        return {
            type: SET_CHATS_REJECT,
            message: 'Users array is empty'
        }
    }

    let chats = [];
    users.forEach(user => {
        chats.push({
            id: user.id,
            user,
            messages: []
        });
    });
    return {
        type: SET_CHATS_FULFILLED,
        chats
    }
}