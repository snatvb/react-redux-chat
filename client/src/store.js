/**
 * Created by snatvb on 17.12.16.
 */


import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';


const mws = process.env.NODE_ENV === 'development' ?
    [promise(), thunk, logger()] : [promise(), thunk];

const middleware = applyMiddleware(...mws);
export default createStore(reducers, middleware);

