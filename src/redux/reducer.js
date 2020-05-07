function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'add':
      return {
        count: state.count + 1
      }
    default:
      return state
  }
}

function infoReducer(state, action) {
  switch (action.type) {
    case 'set_name':
      return {
        info: action.name
      }
    default:
      return state
  }
}

export { counterReducer, infoReducer }
