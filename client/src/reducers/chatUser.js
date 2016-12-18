/**
 * Created by snatvb on 17.12.16.
 */

const initialState = {
    fetching: false,
    fetched: false,
    user: null,
    error: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case "SET_CHAT_USER_REJECT":
            return Object.assign({}, state, {
                user: null,
                fetched: false,
                error: action.error
            });
        case "SET_CHAT_USER_FULFILLED":
            return Object.assign({}, state, {
                user: action.payload,
                fetched: true
            });
        case "REMOVE_CHAT_USER":
            return Object.assign({}, state, {
                user: null,
                fetched: false
            });
        default:
            return state;
    }
};