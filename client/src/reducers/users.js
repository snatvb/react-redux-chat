/**
 * Created by snatvb on 16.12.16.
 */

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case "FETCH_USERS_PENDING":
            return Object.assign({}, state, {
                fetching: true
            });
        case "FETCH_USERS_FULFILLED":
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                users : [
                    ...action.payload
                ]
            });
        case "FETCH_USERS_REJECTED":
            return Object.assign({}, state, {
                fetching: false,
                error: action.payload
            });
        default:
            return state
    }
};