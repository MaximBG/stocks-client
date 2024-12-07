import { IStore } from '../pages/base-page-component'
import { getStockData } from '../api/stocks'

export default class StockStore implements IStore {
  public name: string
  public price: number
  public change: number

  constructor(public readonly symbol: string) {
    this.symbol = symbol
    this.name = ''
    this.price = 0
    this.change = 0
  }

  init = async () => {
    const data = await getStockData(this.symbol)
    this.name = data.name
    this.price = data.price
    this.change = data.change
  }

  destroy = () => null
}
