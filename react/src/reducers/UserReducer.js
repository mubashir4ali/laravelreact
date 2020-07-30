import { saveUserState, loadUserState } from '../localStorage';

const defaultState = 
{
  users: [],
  user: {},
  loggedin: loadUserState(),
  loading: false,
  errors:{}
}


export default (state=defaultState, action={}) => {

  switch (action.type) {

    /// Login User ///
    case 'LOGIN_USER_FULFILLED': {
      saveUserState(action.payload.data)
      return {
        ...state,
        loggedin: action.payload.data,
        loading: false,
        errors: {}
      }
    }

    case 'LOGIN_USER_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'LOGIN_USER_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload }
      }
    }
    /// Login User Ends ///


    /// Logout User ///
    case 'LOGOUT_USER_FULFILLED': {
      saveUserState({})
      return {
        ...state,
        loggedin: {},
        loading: false,
        errors: {}
      }
    }

    /// Logout User Ends ///


    case 'FETCH_USERS_FULFILLED': {
      return {
        ...state,
        users: action.payload.data,
        loading: false,
        errors: {}
      }
    }

    case 'FETCH_USERS_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'FETCH_USERS_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.message }
      }
    }

    case 'NEW_USER': {
      return {
        ...state,
        user: {}
      }
    }

    case 'SAVE_USER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_USER_FULFILLED': {
      return {
        ...state,
        users: [...state.users, action.payload.data],
        errors: {},
        loading: false
      }
    }

    case 'SAVE_USER_REJECTED': {
      const data = action.payload.response.data;

      const { first_name, last_name, access_level, email } = data.errors;
      const errors = { global: data.message, first_name, last_name, access_level, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'FETCH_USER_PENDING': {
      return {
        ...state,
        loading: true,
        user: {name:{}}
      }
    }

    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        user: action.payload.data,
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_USER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_USER_FULFILLED': {
      const user = action.payload.data;
      return {
        ...state,
        users: state.users.map(item => item._id === user.id ? user : item),
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_USER_REJECTED': {
      const data = action.payload.response.data;
      const { first_name, last_name, access_level, email } = data.errors;
      const errors = { global: data.message, first_name, last_name, access_level, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'DELETE_USER_FULFILLED': {
      const id = action.payload.data.id;

      return {
        ...state,
        users: state.users.filter(item => item.id != id)
      }
    }

    default:
      return state;
  }
}
