import { combineReducers } from 'redux';

import { concertReducer } from './concertReducer.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    concert:concertReducer,
    form:formReducer
});

export { rootReducer };
