import React from 'react'
import { debug, sendErrorLog } from 'util/misc'
import { LoadingIndicator } from 'components/loading-indicator/loading-indicator'
import { ErrorPlaceholder } from 'components/error-placeholder/error-placeholder'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

export enum Phase {
  Loading,
  Ready,
  Error,
}

export interface IStore {
  init: () => Promise<void>
  destroy: () => void
  persistent?: boolean
}

export abstract class BasePageComponent<Store extends IStore, P, S> extends React.Component<P, S> {
  @observable phase = Phase.Loading
  store!: Store

  abstract createStore(): Store

  @action
  async componentDidMount() {
    this.store = this.createStore()
    try {
      if (this.store) {
        await this.store.init()
      } else {
        debug('############### Mount: store is null')
      }
      this.phase = Phase.Ready
    } catch (error) {
      this.phase = Phase.Error
      sendErrorLog(this.store?.constructor.name + ': error in initialization', { error })
    }
    setTimeout(() => {
      this.phase = Phase.Ready
    }, 2000)
  }

  componentWillUnmount() {
    if (this.store && !this.store.persistent) {
      this.store.destroy()
    }
  }

  componentDidCatch(error: any, errorInfo: { toString: () => any }) {
    sendErrorLog('Error in ' + this.constructor.name, { error, notes: { errorInfo: errorInfo.toString() } })
    console.error(errorInfo)
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { state: Phase.Error }
  }

  render() {
    return <>{this.phase === Phase.Loading ? <LoadingIndicator /> : <ErrorPlaceholder />}</>
  }
}
