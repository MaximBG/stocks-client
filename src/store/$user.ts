import RootStore from './$root'
import { login, register } from '../api/user'

const LOGGED_IN = 'LOGGED_IN'

export default class UserStore {
  _loggedIn = localStorage.getItem(LOGGED_IN) === true.toString()
  private _user: string = ''

  constructor(public readonly rootStore: RootStore) {}

  set loggedIn(val: boolean) {
    localStorage.setItem(LOGGED_IN, val.toString())
    this._loggedIn = val
    if (!val) {
      this._user = ''
    }
  }

  get loggedIn() {
    return this._loggedIn
  }

  get user() {
    return this._user
  }

  login = async (values: { email: string; password: string }) => {
    await login(values.email, values.password)
    this._loggedIn = true
    this._user = values.email
  }

  register = async (values: { email: string; password: string }) => {
    await register(values.email, values.password)
    this._loggedIn = true
    this._user = values.email
  }
}
