import { client } from './'
import { loadUserToken } from '../localStorage'

const url = '/users'
const loginurl = '/login'
const logouturl = '/logout'


export function loginUser(loginparameters){
  return dispatch => {
    return dispatch({
      type: 'LOGIN_USER',
      payload: client.post(loginurl, loginparameters)
    })
  }
}

export function logoutUser(){
  client.defaults.headers.tnc_user_token = loadUserToken()
  return dispatch => {
    return dispatch({
      type: 'LOGOUT_USER',
      payload: client.get(logouturl)
    })
  }
}

export function fetchUsers(){
  client.defaults.headers.tnc_user_token = loadUserToken()
  return dispatch => {
    dispatch({
      type: 'FETCH_USERS',
      payload: client.get(url)
    })
  }
}

export function newUser() {
  return dispatch => {
    dispatch({
      type: 'NEW_USER'
    })
  }
}

export function saveUser(user) 
{
  client.defaults.headers.tnc_user_token = loadUserToken()
  return dispatch => {
    return dispatch({
      type: 'SAVE_USER',
      payload: client.post('signup', user)
    })
  }
}

export function fetchUser(_id) {
  client.defaults.headers.tnc_user_token = loadUserToken()
  return dispatch => {
    return dispatch({
      type: 'FETCH_USER',
      payload: client.get(`${url}/${_id}`)
    })
  }
}

export function updateUser(user) 
{
  client.defaults.headers.tnc_user_token = loadUserToken()
  return dispatch => {
    return dispatch({
      type: 'UPDATE_USER',
      payload: client.post(`user/${user.id}`, user)
    })
  }
}

export function deleteUser(id) {
  client.defaults.headers.tnc_user_token = loadUserToken()
  return dispatch => {
    return dispatch({
      type: 'DELETE_USER',
      payload: client.delete(`${url}/${id}`)
    })
  }
}
