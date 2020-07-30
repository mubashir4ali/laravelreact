import React from 'react';
import UserRow from './UserRow';

export default function UsersList({users, loading, errors, deleteUser}){

  const loadingMessage = (
      <div className="info">
        Loading...
      </div>
    )

    const emptyMessage = (
      <div className="info">
        No User Found
      </div>
    )

    const timeoutMessage = (
      <div className="info">
        Please run the backend server/{JSON.stringify(errors.global)}
      </div>
    )

  const records = () => {
    return users.map(user => {
      return (
        <UserRow key={user.id} user={user} deleteUser={deleteUser} />
      )
    })
  }

  const userList = (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Access Level</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      { records() }
      </tbody>
    </table>
  )

  return (
    <div>
      { loading && loadingMessage }
      { users.length === 0 && !loading  && !errors.global && emptyMessage }
      { errors && errors.global && timeoutMessage }
      { users.length > 0 && userList }
    </div>
  )
}
