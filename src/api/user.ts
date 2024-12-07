import axios from 'axios'
import RootStore from '../store/$root'
import { IStockBase } from '../types/stock'

axios.defaults.baseURL = '//' + (process.env.REACT_APP_HOSTNAME || window.location.hostname) + '/api/v1/'
axios.defaults.timeout = 2000
axios.defaults.withCredentials = true
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.message?.startsWith('timeout')) {
      RootStore.instance.userStore.loggedIn = false
      window.location.pathname = '/login'
      return Promise.reject(error)
    } else {
      return error
    }
  },
)

let userParams: URLSearchParams

const updateUser = (user: string) => {
  userParams = new URLSearchParams()
  userParams.append('username', user)
}

export const login = async (username: string, password: string) => {
  await axios.post('/user/login', { username, password })
  updateUser(username)
}

export const register = async (username: string, password: string) => {
  await axios.post('/user/register', { username, password })
  updateUser(username)
}

export const setPortfolio = (portfolio: IStockBase[]) => axios.post('/user/portfolio', { data: portfolio, params: userParams })

export const getPortfolio = async () => {
  const result = await axios.get('/user/portfolio', { params: userParams })
  return result.data
}
