import React from 'react'
import { BasePageComponent, Phase } from '../base-page-component'
import { observer } from 'mobx-react'
import StockStore from 'store/$stock'
import { Card } from 'antd'

export interface IStockPage {
  symbol: string
}

@observer
export class StockPage extends BasePageComponent<StockStore, IStockPage, {}> {
  createStore(): StockStore {
    return new StockStore(this.props.symbol)
  }

  render() {
    if (this.phase !== Phase.Ready) return super.render()
    const { store } = this
    return (
      <div>
        <h2>{store.symbol} Stock Details</h2>
        <Card title={`Stock: ${store.name}`}>
          <p>Latest Price: ${store.price}</p>
          <p>Change Today: {store.change}</p>
        </Card>
        )
      </div>
    )
  }
}
