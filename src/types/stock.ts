export interface IStockBase {
  symbol: string
  name: string
  // exchange: string
}

export interface IStock extends IStockBase {
  price: number
  change: number
  details: string
}
