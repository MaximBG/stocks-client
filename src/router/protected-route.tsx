import React from 'react'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import RootStore from '../store/$root'

@observer
export default class ProtectedRoute extends React.Component<{ children: React.ReactNode }> {
  render() {
    return RootStore.instance.userStore.loggedIn ? <>{this.props.children}</> : <Navigate to="/login" />
  }
}
