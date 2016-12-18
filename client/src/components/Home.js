/**
 * Created by snatvb on 16.12.16.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import ChooseUser from './ChooseUser';
import { browserHistory } from 'react-router';


@connect((store) => {
    return {
        profileFetched: store.profile.fetched
    }
})
class Home extends Component {
    constructor(props) {
        super();
        if(props.profileFetched) {
            browserHistory.push('/chat/');
        }
    }

    render() {
        return (
            <div>
                <ChooseUser />
            </div>
        );
    }
}

export default Home;