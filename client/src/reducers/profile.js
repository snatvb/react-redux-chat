/**
 * Created by snatvb on 17.12.16.
 */

let profileLS;
try {
    if(localStorage.profile) {
        profileLS = JSON.parse(localStorage.profile);
        if(!profileLS.fetched) {
            profileLS = null;
        }
    } else {
        profileLS = null;
    }
} catch (error) {
    profileLS = null;
}

const defaultInitialState = {
    fetching: false,
    fetched: false,
    profile: {},
    error: null
};

const initialState = profileLS || defaultInitialState;

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case "FETCH_PROFILE_FULFILLED":
            const newStateProfile = Object.assign({}, state, {
                fetching: false,
                fetched: true,
                profile : {
                    userId: action.payload.id,
                    userName: action.payload.name
                }
            });
            localStorage.profile = JSON.stringify(newStateProfile);
            return newStateProfile;
        case "FETCH_PROFILE_REJECTED":
            return Object.assign({}, state, {
                fetching: false,
                error: action.payload
            });
        case "EXIT_PROFILE_FULFILLED":
            delete localStorage.profile;
            return defaultInitialState;
        default:
            return state
    }
};