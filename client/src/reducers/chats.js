/**
 * Created by snatvb on 17.12.16.
 */

import * as actionTypes from './actionTypes/chats';

const initialState = {
    fetching: false,
    fetched: false,
    chats: [],
    error: null
};


const {ADD_CHAT_FULFILLED, ADD_MESSAGE_FULFILLED, SET_CHATS_FULFILLED} = actionTypes;

//function message(state, action) {
//    switch (action.type) {
//        case ADD_MESSAGE_FULFILLED:
//            return {
//                id: action.id,
//                user: action.user,
//                text: action.text,
//                date: action.date
//            };
//        default:
//            return state
//    }
//}

function chat(state, action = {}) {
    switch (action.type) {
        case ADD_CHAT_FULFILLED:
            return {
                id: action.id,
                user: action.user,
                messages: action.messages || []
            };
        case ADD_MESSAGE_FULFILLED:
            if (action.user.id !== state.id) {
                return state;
            }
            return Object.assign({}, state, {
                messages: [
                    ...state.messages,
                    {
                        id: action.id,
                        user: action.userProfile,
                        text: action.text,
                        date: action.date
                    }
                ]
            });
        default:
            return state;
    }
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case ADD_CHAT_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                chats: [
                    ...state.chats,
                    chat(state, action)
                ]
            });
        case ADD_MESSAGE_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                chats: state.chats.map(st => chat(st, action))
            });
        case SET_CHATS_FULFILLED:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                chats: action.chats
            });
        default:
            return state;
    }
}