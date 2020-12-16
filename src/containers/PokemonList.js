import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import _, { subtract } from "lodash";
import {GetPokemonList, GetPokemon} from "../actions/pokemonActions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import Card from "../components/Card";
import { getPokemon, getAllPokemon } from '../services/pokemon';
import '../App.css';
import typeColors from '../helpers/typeColors';
import { axios } from "axios";

const PokemonList = (props) => {
    const [search, setSearch] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    const pokemonList = useSelector(state => state.PokemonList);
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon'
    const [wildPokemon, setWildPokemon] = useState({});

    React.useEffect(() => {
        FetchData(1)
        
    }, []);

    // useEffect(() => {
    //     encounterWildPokemon()
    //   }, []);

    const pokeId = () => {
        const min = Math.ceil(1)
        const max = Math.floor(151)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

    const encounterWildPokemon = () => {
        axios
          .get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
          .then(response => {
            setWildPokemon(response.data);
          })
      }

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
      }
    
        const ShowData = () => {

            if (pokemonList.loading) {
            return <p>Loading...</p>
            }
        
            if (!_.isEmpty(pokemonList.data)) {
                
                return(
                    <div className={"list-wrapper grid-container"}>
                        {
                         pokemonList.data.map(el => {
                            const url = el.url;
                            let str = el.url;
                            let subStr = str.substring(34,35);
                            return(
                            
                            <div className={"pokemon-item Card"}>
                                <p>{el.name} <br/> 
                                    {/* {el.url} <br /> <br /> */}
                                    {/* {subStr} */}
                                    <img src= {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + subStr + ".png"}/> <br />
                                    {/* <img src= {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + subStr + ".png"}/>  */}
                                    {/* <img src= {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + subStr + ".png"}/><br /> */}
                                    <Link to={`/Pokemon/${el.name}`} style={{textDecorationLine: "underline"}} className="Card__view">View</Link>
                                </p>
                                
                            </div>
                            )
                        })}
                        
                    </div>
                    
                )
            }
            
            if (pokemonList.errorMsg !== "") {
                return <p>{pokemonList.errorMsg}</p>
            }
        
            return <p>unable to get data</p>
        };

        return(
            <div>
            <div className={"search-wrapper"}>
                <p>Search: </p>
                <input type="text" onChange={e => setSearch(e.target.value)}/>
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {ShowData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                pageCount={Math.ceil(pokemonList.count / 15)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={(data) => FetchData(data.selected + 1)}
                containerClassName={"pagination"}
                />
            )}
            </div>
        )

};

export default PokemonList