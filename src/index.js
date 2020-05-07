import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { connect } from './react-redux/connect'
import { createStore } from './redux/store'
import { counterReducer, infoReducer } from './redux/reducer'
import { combineReducers } from './redux/combineReducers'
import { Provider, ReactReduxContext } from './react-redux/provider'

const store = createStore(combineReducers({
  counter: counterReducer,
  info: infoReducer
}))

store.subscribe(() => console.log('store state', store.getState()))

function TestConnect(props) {
  console.log('TestConnect props', props)
  return (
    <button onClick={props.add}>count ++</button>
  )
}

const Hoc = connect(state => ({
  counter: state.counter,
}), dispatch => ({
  add: () => dispatch({ type: 'add' })
}))(TestConnect)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Hoc />
    </div>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
