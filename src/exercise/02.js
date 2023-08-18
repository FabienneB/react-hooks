// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Extra credit 3 custom hook Custom Hook needs to start with use
function useLocalStorageState(key, defaultValue = '', {serialize = JSON.stringify, deserialize = JSON.parse} = {}) {
  // const [state, setState] = React.useState(() => window.localStorage.getItem(key) ?? defaultValue);
   // Extra credit 4 make it generic enough to support any data type
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  })

  // React.useEffect(() => { // Called for initial render and rerender 
  //   window.localStorage.setItem(key, state);
  // }, [state]);

  const prevKeyRef = React.useRef(key) // Object I can mutate without triggering rerender

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => { // Extra credit 4
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])
  
  return [state, setState];
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName);
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // initialName = window.localStorage.getItem('name') ?? initialName;
  
  // Extra credit 1 Lazy initialization feature
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName,
  // )

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0);
  return <> <button onClick={() => setCount(previousCount => previousCount + 1)}> {count}</button><Greeting /></>
}

export default App
