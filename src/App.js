import React from 'react';
import './App.css';
import {Switch, Route, NavLink, Redirect} from "react-router-dom";
import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      {/* <nav>
        <NavLink to={"/"}>Search</NavLink>
      </nav> */}
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
// -------------------------
// import logo from './logo.svg';
// import './App.css';
// import React, {useState, useEffect} from 'react';
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import { getPokemon, getAllPokemon } from './services/pokemon';
// import './App.css';
// import { Route, Switch } from 'react-router-dom';
// // import Pokemon from "./PokemonDetail";

// function App() {
//   const [pokemonData, setPokemonData] = useState([])
//   const [nextUrl, setNextUrl] = useState('');
//   const [prevUrl, setPrevUrl] = useState('');
//   const [loading, setLoading] = useState(true);
//   const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

//   useEffect(() => {
//     async function fetchData() {
//       let response = await getAllPokemon(initialUrl)
//       setNextUrl(response.next);
//       setPrevUrl(response.previous);
//       await loadPokemon(response.results);
//       setLoading(false);
//     }
//     fetchData();
//   }, [])

//   const next = async () => {
//     setLoading(true);
//     let data = await getAllPokemon(nextUrl);
//     await loadPokemon(data.results);
//     setNextUrl(data.next);
//     setPrevUrl(data.previous);
//     setLoading(false);
//   }

//   const prev = async () => {
//     if (!prevUrl) return;
//     setLoading(true);
//     let data = await getAllPokemon(prevUrl);
//     await loadPokemon(data.results);
//     setNextUrl(data.next);
//     setPrevUrl(data.previous);
//     setLoading(false);
//   }

//   const loadPokemon = async (data) => {
//     let _pokemonData = await Promise.all(data.map(async pokemon => {
//       let pokemonRecord = await getPokemon(pokemon)
//       return pokemonRecord
//     }))
//     setPokemonData(_pokemonData);
//   }

//   return (
//     <>
//       <Navbar />
//       <div>
//         {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
//           <>
//             <div className="btn">
//               <button onClick={prev}>Prev</button>
//               <button onClick={next}>Next</button>
//             </div>
//             <div className="grid-container">
//               {pokemonData.map((pokemon, i) => {
//                 return <Card key={i} pokemon={pokemon} />
//               })}
//             </div>
//             <div className="btn">
//               <button onClick={prev}>Prev</button>
//               <button onClick={next}>Next</button>
//             </div>
//             <div>hahahaha</div>
//           </>
//         )}
//       </div>
//       {/* <Switch>
//         <Route path={"/pokemon/:pokemon"} exact component={Pokemon}></Route>
//       </Switch>  */}
//     </>
//   );
// }

// export default App;
