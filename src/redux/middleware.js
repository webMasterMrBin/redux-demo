import { createStore } from './middleware'

// const next = store.dispatch;

// 一个loggeer的增强dispatch
// 重写dispatch
const loggerMiddle = store => next => action => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action)
  console.log('this state', store.getState());
}

const errMiddle = store => next => action => {
  try {
    console.log('处理 err')
    next(action)
  } catch (e) {
    console.log('e', e)
  }
}

const applyMiddleware = function (...middlewares) {
  /*返回一个重写createStore的方法*/
  return function rewriteCreateStoreFunc(oldCreateStore) {
     /*返回重写后新的 createStore*/
    return function newCreateStore(reducer, initState) {
      /*1. 生成store*/
      const store = oldCreateStore(reducer, initState);
      /*给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/
      /* const chain = [exception, time, logger]*/
      const chain = middlewares.map(middleware => middleware(store));
      let dispatch = store.dispatch;
      /* 实现 exception(time((logger(dispatch))))*/
      chain.reverse().map(middleware => {
        dispatch = middleware(dispatch);
      });

      /*2. 重写 dispatch*/
      store.dispatch = dispatch;
      return store;
    }
  }
}

// Use like
//applyMiddleware(errMiddle, loggerMiddle)

export { loggerMiddle, errMiddle }
