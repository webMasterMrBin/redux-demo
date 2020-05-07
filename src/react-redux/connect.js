// 使用 useContext 获取到传入的 store 和 subscription。
// 对 subscription 添加一个 listener，这个 listener 的作用就是一旦 store 变化就重新渲染组件。
// store 变化之后，执行 mapStateToProps 和 mapDispatchToProps 两个函数，将其和传入的 props 进行合并，最终传给 WrappedComponent。

import React, { useContext, useEffect, useState } from 'react'
import { ReactReduxContext } from './provider'


// connect(state => ({ tmp: state.tmp }), dispatch => ({ dispatch1: dispatch({ type: 'tmp' }) }))
const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  function Connect (props) {
    const { store, subscription } = useContext(ReactReduxContext)
    const [count, setCount] = useState(0)

    useEffect(() => {
      // 每次store变化 连接的Connectre-render
      subscription.addlisteners(() => setCount(count + 1))
    })

    console.log('connect render', store.getState())

    const newProps = {
      ...props,
      ...mapStateToProps(store.getState()),
      ...mapDispatchToProps(store.dispatch)
    }

    return <WrappedComponent {...newProps} />
  }
  // Connect.displayName = `Connect(${WrappedComponent.displayName || WrappedComponent.name || 'component'})`
  return Connect
}

export { connect }
