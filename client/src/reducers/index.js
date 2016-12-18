/**
 * Created by snatvb on 16.12.16.
 */

import {combineReducers} from 'redux';

import users from './users';
import profile from './profile';
import chatUser from './chatUser';
import chats from './chats';

export default combineReducers({
    users,
    profile,
    chatUser,
    chats
});