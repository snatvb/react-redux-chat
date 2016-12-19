/**
 * Created by snatvb on 19.12.16.
 */

import React from 'react';
import {undecorated as ChatList} from './ChatsList';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';


describe('Chats list component', () => {
    it('render list chats', () => {
        const props = {
            users: [
                {
                    id: 23432,
                    name: "tester"
                },
                {
                    id: 23435,
                    name: "tester 2",
                    online: true
                }
            ],
            chats: [
                {
                    id: 23432,
                    user: {
                        id: 23432,
                        name: "tester"
                    },
                    messages: []
                },
                {
                    id: 23435,
                    user: {
                        id: 23435,
                        name: "tester 2",
                        online: true
                    },
                    messages: []
                }
            ],
            chatsFetched: true,
            profile: {
                userName: 'TESTER 4',
                id: 2352342
            },
            profileFetched: true
        };
        const component = renderer.create(
            <ChatList {...props} />
        );
        expect(component).toMatchSnapshot();
    });
});