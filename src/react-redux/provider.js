import React, { useEffect, useState } from 'react'
import Subscription from './Subscription'
const ReactReduxContext = React.createContext(null);

// Provider.js
const Provider = ({ store, children }) => {
  console.log('provider store', store.getState())
  const [state, setState] = useState()

  // 方案一 不对store监听 Provider 渲染后注册store.subscribe监听provider
  // 每次store变化Provider re-render 然后store就是更新后的值
  // 问题: 导致所有Provider的子组件都会re-render 而不是Connect的hoc re-render
  // useEffect(() => {
  //   store.subscribe(() => setState(Math.random()))
  // }, [])

  // NOTE 正确思路
  // 将 store 通过 Context 传给后代组件，注册对 store 的监听。
  // 然后子Connect组件订阅到这个监听器 push 任务
  const subscription = Subscription(store)
  useEffect(() => {
    subscription.trySubsctiption()
  }, [])

  return (
    <ReactReduxContext.Provider value={{ store, subscription }}>
      {children}
    </ReactReduxContext.Provider>
  )
}

export { Provider, ReactReduxContext }
