import axios from 'axios'
import { IStockBase } from '../types/stock'

export const getExchanges = async () => {
  const response = await axios.get('/data/exchanges')
  return response.data
}

export const getStockData = async (symbol: string) => {
  const response = await axios.get('/data/stock/' + symbol)
  return response.data[0]
}

// TODO: optionally search stocks by exchange
// export const findStocks = async (exchange: string, symbol: string) => {
//   const response = await axios.get('/data/stock/search/' + exchange + '/' + symbol)
//   return response.data
// }

export const findStocks = async (query: string): Promise<IStockBase[]> => {
  const response = await axios.get('/data/stock/search/' + query)
  return response.data
}
