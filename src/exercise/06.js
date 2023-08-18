// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonDataView, PokemonForm, PokemonInfoFallback, fetchPokemon} from '../pokemon'

import { ErrorBoundary } from "react-error-boundary";

// Extra credit number 6 

// // Extra credit number 4
// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error};
//   }
//   render() {
//     const {error} = this.state;
//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children;
//   }
// }

function PokemonInfo({pokemonName}) {
  // const [pokemonData, setPokemonData] = React.useState(null);
  const [state, setState] = React.useState({status: pokemonName ? 'pending' : 'idle', pokemon: null, error: null});
  // setState({status: 'resolved', pokemon})
  // const [error, setError] = React.useState(null);
  // const [status, setStatus] = React.useState('idle');

  React.useEffect(() => {
    if(!pokemonName) return;
    //setPokemonData(null);
    setState({status: 'pending'});
    // setError(null);
    //setStatus('pending');
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon});
        //setPokemonData(data)
        //setStatus('resolved');
      },
      error => {
        // setError(error);
        setState({status: 'rejected', error});
        //setStatus('rejected');
      },
  )}, [pokemonName])
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  // Extra credit 3
  const {status, pokemon, error} = state; 
  if (status === 'rejected') {
    // return (<div role="alert">
    //    There was an error: <pre style={{whiteSpace: 'normal'}}>{error .message}</pre>
    //  </div>);
    throw error;
  }
  if (status === 'idle') return 'Submit a pokemon';
  if (status === 'pending') return  <PokemonInfoFallback name={pokemonName} />;

  if(status === 'resolved') return <PokemonDataView pokemon={pokemon} />;
  // Extra credit number 2
  // if (status === 'rejected') {
  //   return (<div role="alert">
  //      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //    </div>);
  // }
  // if (status === 'idle') return 'Submit a pokemon';
  // if (status === 'pending') return  <PokemonInfoFallback name={pokemonName} />;

  // if(status === 'resolved') return <PokemonDataView pokemon={pokemonData} />;

  throw new Error('This should be impossible');
  // Extra credit number 1
  // if (error) {
  //   return (<div role="alert">
  //     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //   </div>);
  // }
  // if (!pokemonName) return 'Submit a pokemon';
  // if (!pokemonData) return  <PokemonInfoFallback name={pokemonName} />;
  // return <PokemonDataView pokemon={pokemonData} />
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  
  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }
  
  function handleReset() {
    setPokemonName('')
  }
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
      {/* <ErrorBoundary FallbackComponent={ErrorFallback} key={pokemonName}> */}
      {/* <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}> */}
      <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pokemonName]} onReset={handleReset}>
        <PokemonInfo pokemonName={pokemonName} />
      </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

