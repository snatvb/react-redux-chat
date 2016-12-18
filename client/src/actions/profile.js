/**
 * Created by snatvb on 17.12.16.
 */

import * as actionTypes from '../reducers/actionTypes/profile';

const {FETCH_PROFILE_FULFILLED, FETCH_PROFILE_REJECT, EXIT_PROFILE_FULFILLED} = actionTypes;

export function setProfile(user) {
    if (!user || !user.id) {
        return {
            type: FETCH_PROFILE_REJECT,
            payload: {message: 'User is undefined (in actions/profile)'}
        }
    }
    return {
        type: FETCH_PROFILE_FULFILLED,
        payload: {id: user.id, name: user.name}
    }
}

export function logout() {
    return {
        type: EXIT_PROFILE_FULFILLED,
        payload: {}
    }
}