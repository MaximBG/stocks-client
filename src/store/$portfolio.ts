import { action, IObservableArray, observable, reaction } from 'mobx'
// import { getExchanges } from 'api/stocks'
import { IStore } from 'pages/base-page-component'
import RootStore from './$root'
import { IStockBase } from '../types/stock'
import { getPortfolio } from '../api/user'
import { debounce } from '../util/misc'
import { findStocks } from '../api/stocks'

export default class PortfolioStore implements IStore {
  public persistent = true
  // @observable public exchanges: IObservableArray<string> = observable([]) todo: find / filter by exchange
  @observable public portfolio: IObservableArray<IStockBase> = observable([])
  @observable public searchStockKey: string = ''
  @observable public foundStocks: IObservableArray<IStockBase> = observable([])
  private readonly disposer: () => any

  constructor(public readonly rootStore: RootStore) {
    this.disposer = reaction(
      () => this.searchStockKey,
      debounce(async () => {
        const matchedStocks = await findStocks(this.searchStockKey)
        this.foundStocks.replace(matchedStocks)
      }, 1000),
    )
  }

  @action setSearchStockKey = (key: string) => {
    this.searchStockKey = key
  }

  public addStock = (/*stock: IStockBase*/) => {}

  public removeStock = (symbol: string) => {
    const idx = this.portfolio.findIndex((stock) => stock.symbol === symbol)
    this.portfolio.splice(idx, 1)
  }

  public init = async () => {
    // const data = await getExchanges()
    // this.exchanges.replace(data)
    const portfolio = await getPortfolio()
    this.portfolio.replace(portfolio)
  }

  public destroy = () => this.disposer()
}
