import React, { Component}  from 'react'
import { withRouter }       from 'react-router-dom'
import { connect }          from 'react-redux'
import { loginUser }        from '../actions/UserActions'

class LoginPage extends Component {

  constructor (props){
      super(props);
    
      this.state = {
          email: "",
          password: ""
      };

      this.clickLogin = this.clickLogin.bind(this)
    
  }

  componentDidMount() {
    if(this.props.loggedin && this.props.loggedin.id){
      this.props.history.push('/')
    }
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value })
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value })
  };

  clickLogin() {
    this.props.loginUser(this.state)
    .then(response => {
      this.props.history.push('/')
    })
    .catch(err => {
      console.log("error logging in")
     })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <hr />
        {this.props.errors.global && this.props.errors.global.response && JSON.stringify(this.props.errors.global.response.data.error)}<br /><br />
          <input type="text" value={this.state.email} 
              onChange={this.handleChangeEmail} 
              placeholder="Email" /><br /><br />
          <input type="password" 
              value={this.state.password} 
              placeholder="password"
              onChange={this.handleChangePassword} /><br /><br />
          <button onClick={this.clickLogin}>Login</button>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      loggedin : state.userStore.loggedin,
      loading: state.userStore.loading,
      errors: state.userStore.errors
  }
}

export default withRouter(
  connect(mapStateToProps, {loginUser})(LoginPage)
)