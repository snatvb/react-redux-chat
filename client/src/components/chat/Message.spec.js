/**
 * Created by snatvb on 19.12.16.
 */

import React from 'react';
import {undecorated as Message} from './Message';
import { shallow, mount, render } from 'enzyme';


describe('Message component', () => {
    it('render message him component', () => {
        const props = {
            profile: {
                userId:1,
                userName: 'Test'
            },
            message: {
                id: 0,
                user: {
                    id: 0,
                    name: 'Tester 0'
                },
                text: 'this is test message',
                date: new Date()
            }
        };
        const wrapper = shallow (<Message {...props} />);
            //chat-content_him-message_message
        expect(
            wrapper.prop('className')
        ).toEqual('chat-content_him-message')
    });
    it('render message MY component', () => {
        const props = {
            profile: {
                userId:1,
                userName: 'Test'
            },
            message: {
                id: 0,
                user: {
                    id: 1,
                    name: 'Test'
                },
                text: 'this is test message',
                date: new Date()
            }
        };
        const wrapper = shallow (<Message {...props} />);
        expect(
            wrapper.prop('className')
        ).toEqual('chat-content_me-message')
    });
});