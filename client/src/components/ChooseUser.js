/**
 * Created by snatvb on 17.12.16.
 */

import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import * as usersActions from '../actions/users';
import * as profileActions from '../actions/profile';

@connect((store) => {
    return {
        users: store.users.users,
        userFetched: store.users.fetched
    }
})
class ChooseUser extends Component {
    //constructor() {
    //    super();
    //    this.chooseUser = this.chooseUser.bind(this);
    //}


    componentWillMount() {
        this.props.dispatch(usersActions.getUsers());
    }

    chooseUser (user) {
        this.props.dispatch(profileActions.setProfile(user));
        browserHistory.push('/chat');
    }

    render() {
        const { users } = this.props;

        const renderUsers = users.map((user) => {
            return <Button onClick={this.chooseUser.bind(this, user)} key={user.id} bsStyle="primary" bsSize="large" block>{user.name}</Button>
        });
        return (
            <div className="home choose-user">
                <h2 className="text-center">Выберите пользователя:</h2>
                <div className="well choose-user_list">
                    {renderUsers}
                </div>
            </div>
        );
    }
}

export default ChooseUser;