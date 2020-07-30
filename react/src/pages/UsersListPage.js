import React, { Component}            from 'react'
import { connect }                    from 'react-redux'
import UsersList                      from '../components/UsersList'
import { fetchUsers, deleteUser }     from '../actions/UserActions'

class UsersListPage extends Component 
{

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <h1>List of Users</h1>
        <hr />
        <UsersList users={this.props.users} loading={this.props.loading} errors={this.props.errors} deleteUser={this.props.deleteUser}/>
      </div>
    )
  }
}

// Make users  array available in  props
function mapStateToProps(state) {
  return {
      users : state.userStore.users,
      loading: state.userStore.loading,
      errors: state.userStore.errors
  }
}

export default connect(mapStateToProps, {fetchUsers, deleteUser})(UsersListPage)
