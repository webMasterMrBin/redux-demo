const createStore = function (reducer) {
  let state
  let listeners = [];

  /*订阅*/
  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action)

    /*通知*/
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  // 如果在createStore里 没有穿 instState 初始化每个reducer里的initState
  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState
  }
}

export { createStore }
