import React, { Component}    from 'react'
import { connect }            from 'react-redux'
import { newUser, 
  saveUser, 
  fetchUser, 
  updateUser }                from '../actions/UserActions'
import UserForm               from '../components/UserForm'


class UserFormPage extends Component {

  componentDidMount = () => {
    const { id } = this.props.match.params;

    if(id){
      this.props.fetchUser(id)
    } else {
      this.props.newUser()
    }
  }

  submit = (user) =>
  {
    if(user.id)
    {
      return this.props.updateUser(user)
        .then(response => {
          this.props.history.push('/users')
        })
        .catch(err => {
          alert("Error Updating")
        })
    }
    else
    {
      return this.props.saveUser(user)
      .then(response => {
        this.props.history.push('/login')
      })
      .catch(err => {
          alert("Error Creating")
      })
    }
  }

  render() {
    return (
      <div>
        <h1>User Form: </h1>
        <hr />
        <UserForm user={this.props.user} loading={this.props.loading} onSubmit={this.submit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userStore.user,
    errors: state.userStore.errors
  }
}

export default connect(mapStateToProps, {newUser, saveUser, fetchUser, updateUser})(UserFormPage)
