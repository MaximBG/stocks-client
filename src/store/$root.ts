import UserStore from './$user'
import PortfolioStore from './$portfolio'

export default class RootStore {
  private static _instance: RootStore
  public readonly userStore: UserStore
  public readonly portfolioStore: PortfolioStore

  private constructor() {
    this.userStore = new UserStore(this)
    this.portfolioStore = new PortfolioStore(this)
  }

  public static get instance() {
    if (!this._instance) {
      RootStore._instance = new RootStore()
    }
    return this._instance
  }
}
