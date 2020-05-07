// 用于监听redux store的订阅器

function Subscription(store) {
  const listeners = []

  const notify = () => {
    listeners.forEach(listener => {
      listener()
    });
  }

  const addlisteners = listener => listeners.push(listener)

  return {
    trySubsctiption: () => store.subscribe(notify),
    addlisteners
  }
}

export default Subscription
