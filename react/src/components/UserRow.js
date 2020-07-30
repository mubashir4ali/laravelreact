import React          from 'react'
import { connect }    from 'react-redux'
import { Link }       from 'react-router-dom'

const UserRow = ({user, deleteUser, loggedin}) => {

  const confirmDelete = (id) => {
    
    if(confirm('Are you sure you want to delete the user?')){
      deleteUser(id)
    }
  }

  return (
    <tr>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td><b>{user.access_level}</b></td>
      <td>{user.created_at}</td>
      <td>{user.updated_at}</td>
      <td>
        {(loggedin && (
          loggedin.access_level!=="user" || user.id == loggedin.id) && 
          user.access_level!=="super"
        ) && <Link to={`/users/edit/${user.id}`}>Edit</Link>}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {loggedin && loggedin.access_level!=="user" && 
          user.access_level!=="super" && 
          <button onClick={() => confirmDelete(user.id)} value="Delete" >Delete</button>}
      </td>
    </tr>
  )
}

UserRow.propTypes = {
  user: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      loggedin : state.userStore.loggedin
  }
}

export default connect(mapStateToProps)(UserRow)