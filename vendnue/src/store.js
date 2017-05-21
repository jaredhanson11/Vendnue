import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { rootReducer } from './reducers';

const middleware = applyMiddleware(apiMiddleware, logger());
//logger()

var configureStore = function(initialState){
    return createStore(
        rootReducer,
        initialState,
        middleware
    );
};

export { configureStore };
