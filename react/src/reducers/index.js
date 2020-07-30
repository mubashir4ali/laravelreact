import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
// import { reducer as formReducer } from 'redux-form';

const reducers = {
  userStore: UserReducer
  // form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
