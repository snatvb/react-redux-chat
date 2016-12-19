/**
 * Created by snatvb on 19.12.16.
 */

import * as actions from './chats'
import * as actionTypes from '../reducers/actionTypes/chats'
const {SET_CHATS_FULFILLED,
    ADD_MESSAGE_FULFILLED} = actionTypes;

describe('chats actions', () => {
    it('addMessage should create ADD_MESSAGE_FULFILLED action', () => {
        expect(actions.addMessage({ id: 1, name: "Tester 2" }, { id: 0, name: "Tester" }, "test message"))
            .toEqual({
                type: ADD_MESSAGE_FULFILLED,
                id: (new Date()).getTime() || (new Date()).getTime() + 1,
                date: new Date(),
                userProfile: { id: 0, name: "Tester" },
                user: { id: 1, name: "Tester 2" },
                text: "test message"
            })
    });

    it('setChats should create SET_CHATS_FULFILLED action', () => {
        expect(actions.setChats([{ id: 1, name: "Tester 2" }, { id: 0, name: "Tester" }]))
            .toEqual({
                type: SET_CHATS_FULFILLED,
                chats: [
                    { id: 1, user: { id: 1, name: "Tester 2" }, messages: [] },
                    { id: 0, user: { id: 0, name: "Tester" }, messages: [] }
                ]
            })
    });
});
