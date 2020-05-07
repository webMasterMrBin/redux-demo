import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from './redux/store'
import { counterReducer, infoReducer } from './redux/reducer'
import { combineReducers } from './redux/combineReducers'
import { loggerMiddle, errMiddle } from './redux/middleware'
import { Provider, ReactReduxContext } from './react-redux/provider'
import { connect } from './react-redux/connect'

const store = createStore(combineReducers({
  counter: counterReducer,
  info: infoReducer
}))

console.log('store state', store.getState())

store.subscribe(() => console.log('store state', store.getState()))

const logger = loggerMiddle(store)
const err = errMiddle(store)

const next = store.dispatch;

store.dispatch = err(logger(next))

function Bar() {
  return <Child />
}

function Child(props) {
  const value = useContext(ReactReduxContext)
  console.log('provider child', value)
  return <div onClick={() => {
    store.dispatch({
      type: 'add'
    })
  }}>ddd</div>
}

function TestConnect() {
  return <div>tst</div>
}

const Hoc = connect()(TestConnect)

function App() {
  console.log('ff', store.getState())
  console.log('HOc', Hoc)
  return (
    <div className="App">
      <button onClick={() => store.dispatch({ type: 'add' })}>click</button>
      <button onClick={() => store.dispatch({ type: 'set_name', name: 'dd' })}>info</button>
      <button onClick={() => logger(next)({ type: 'ff' })}>logger middleware</button>
      <button onClick={() => store.dispatch({ type: 'cbb' })}>中间件处理后的dispatch</button>

      <Provider store={store}>
        <Hoc />
      </Provider>
    </div>
  );
}

export default App;
