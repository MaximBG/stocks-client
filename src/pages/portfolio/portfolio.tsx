import React from 'react'
import { BasePageComponent, Phase } from '../base-page-component'
import { observer } from 'mobx-react'
import PortfolioStore from 'store/$portfolio'
import RootStore from 'store/$root'
import { Button, Input, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { IStockBase } from '../../types/stock'

@observer
class HomePage extends BasePageComponent<PortfolioStore, any, any> {
  createStore(): PortfolioStore {
    return RootStore.instance.portfolioStore
  }

  private columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (symbol: string) => <Link to={`/stock-details/${symbol}`}>{symbol}</Link>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IStockBase) => (
        <Button danger onClick={() => this.store.removeStock(record.symbol)}>
          Remove
        </Button>
      ),
    },
  ]

  render() {
    if (this.phase !== Phase.Ready) return super.render()
    return (
      <div>
        <h2>{this.store.rootStore.userStore.user} Portfolio</h2>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space>
            <Input placeholder="Enter stock symbol" value={this.store.searchStockKey} onChange={(e) => this.store.setSearchStockKey(e.target.value)} />
            <Button type="primary" onClick={this.store.addStock}>
              Add Stock
            </Button>
          </Space>
          <Table dataSource={this.store.foundStocks} columns={this.columns} rowKey="symbol" />
        </Space>
      </div>
    )
  }
}

export default HomePage
