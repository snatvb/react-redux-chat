/**
 * Created by snatvb on 19.12.16.
 */


import * as actionTypes from './actionTypes/users';
import users from './users';

const {FETCH_USERS_FULFILLED} = actionTypes;

describe('test reduce users', () => {
    it('create action FETCH_USERS_FULFILLED', ()=> {
        expect(users(undefined, {
            type: FETCH_USERS_FULFILLED,
            payload: [
                {id: 0, name: "Vasya"},
                {id: 1, name: "Petya"}
            ]
        })).toEqual({
            fetching: false,
            fetched: true,
            users: [
                {id: 0, name: "Vasya"},
                {id: 1, name: "Petya"}
            ],
            error: null
        });
    })
});