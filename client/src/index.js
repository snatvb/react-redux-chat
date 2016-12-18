import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';


import App from './App';
import Home from './components/Home';
import Chat from './components/chat';
import './scss/app.scss';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
            </Route>
            <Route path='chat' component={App}>
                <IndexRoute component={Chat}/>
                <Route path=":userId" component={Chat} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

//store.dispatch({
//    type: 'USERS',
//    payload: axios.get("/api/")
//});