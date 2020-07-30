import React, { Component }           from 'react'
import { connect }                    from 'react-redux'
import { withRouter, NavLink, Route } from 'react-router-dom'

import WelcomePage                    from './pages/WelcomePage'
import LoginPage                      from './pages/LoginPage'
import UsersListPage                  from './pages/UsersListPage'
import UserFormPage                   from './pages/UserFormPage'

import { logoutUser }                 from './actions/UserActions'

import './App.css'

class App extends Component 
{

  constructor (props)
  {
    super(props);
    this.clickLogout = this.clickLogout.bind(this);  
  }

  isLoggedIn(){
    if(this.props.loggedin && this.props.loggedin.id){
      return true;
    }
    return false;
  }

  clickLogout(){

    this.props.logoutUser()
    .then(response => {
      this.props.history.push('/')
    })
    .catch(err => {
      console.log("error logging out")
    })
  }

  render() {
    return (
      <div>
        <div className='navbar'>
          <div className="container">
          <NavLink activeClassName="active" exact to="/">Home</NavLink>
          {this.isLoggedIn() && 
            <div>
              <NavLink activeClassName="active" exact to="/users">Users List</NavLink>
              {/* <NavLink activeClassName="active" exact to="/users/new">Add User</NavLink> */}
              <span>&nbsp;&nbsp;||&nbsp;&nbsp;</span>
              <span onClick={this.clickLogout}>Logout</span>
              <span>Welcome <b>{this.props.loggedin.first_name} {this.props.loggedin.last_name}</b></span><br />
            </div>
          }
          {!this.isLoggedIn() && 
            <div>
              <NavLink activeClassName="active" exact to="/login">Login</NavLink>
              <NavLink activeClassName="active" exact to="/users/new">Sign Up</NavLink>
            </div>
          }
          </div>
        </div>

        <div className="main container">
          <Route exact path="/" component={WelcomePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route path="/users/new" component={UserFormPage}/>
          {this.isLoggedIn() && 
            <div>
              <Route exact path="/users" component={UsersListPage}/>
              <Route path="/users/edit/:id" component={UserFormPage}/>
            </div>
          }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      loggedin : state.userStore.loggedin
  }
}

export default withRouter(
  connect(mapStateToProps, {logoutUser})(App)
);