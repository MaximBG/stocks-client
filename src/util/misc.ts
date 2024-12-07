export const devMode = process.env.NODE_ENV === 'development'

export const debug = (...msg: any[]) => {
  if (!devMode) return
  console.log(...msg)
}

export const sendErrorLog = (message: string, notes?: any) => {
  //not implemented
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
