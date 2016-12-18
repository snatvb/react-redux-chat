/**
 * Created by snatvb on 17.12.16.
 */

import * as actionTypes from '../reducers/actionTypes/chatUser';

const {SET_CHAT_USER_FULFILLED, SET_CHAT_USER_REJECT} = actionTypes;

export function setChatUser (user) {
    if(!user || !user.id) {
        return {
            type: SET_CHAT_USER_REJECT,
            error: {message: 'User is not defined (chat user action)'}
        }
    }
    return {
        type: SET_CHAT_USER_FULFILLED,
        payload: user
    }
}