/**
 * Created by snatvb on 19.12.16.
 */

import React from 'react';
import ChatsListItem from './ChatsListItem';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';


describe('Chats List Item component', () => {
    it('render list chats', () => {
        const props = {
            chat: {
                id: 0,
                user: {
                    id: 23432,
                    name: "tester"
                }
            }
        };
        const component = renderer.create(
            <ChatsListItem {...props} />
        );
        expect(component).toMatchSnapshot();
    });
    it('render list chats when online', () => {
        const props = {
            chat: {
                id: 1,
                user: {
                    id: 234324,
                    name: "tester 2",
                    online: true
                }
            }
        };
        const component = renderer.create(
            <ChatsListItem {...props} />
        );
        expect(component).toMatchSnapshot();
    });
});