import { createStore, combineReducers, applyMiddleware } from 'redux';
import mainReducer from './reducers/mainReducer'

import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

let listRedusers = combineReducers({
    main: mainReducer,  
    form: formReducer
});

let store = createStore(listRedusers, applyMiddleware(thunkMiddleware));

window.st = store;
export default store;