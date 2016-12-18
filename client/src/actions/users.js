/**
 * Created by snatvb on 16.12.16.
 */

import axios from 'axios';

export function getUsers() {
    return function (dispatch) {
        axios.get("/api/users/")
            .then((response) => {
                dispatch({ type: 'FETCH_USERS_FULFILLED', payload: response.data })
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USERS_REJECT', payload: error })
            });
    }
}
export function updateUsers(users) {
    return {
        type: 'FETCH_USERS_FULFILLED', payload: users
    }
}