import React from 'react'
// import './App.css'
import { Router } from './router/router'
import RootStore from './store/$root'

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _rootStore = RootStore.instance
  return <Router />
}

export default App
