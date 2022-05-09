import React, {useContext, useEffect} from "react";
import "./pokemons.scss"
import PokeCard from "../pokecard/pokeCard";
import constants from "../../config/constants";
import { observer } from "mobx-react-lite";
import { PokeStoreContext } from "../../mobx/store";
import Search from "../search/search";
import Filters from "../filters/filters";
import Loading from "../loading/loading";


const Pokemons = () => {
  const [pokemonsList, setPokemons] = React.useState([]);
  const [filterPokemons, setFilterPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  const [searchStr, setSerachStr] = React.useState("");
  const PokeStore = useContext(PokeStoreContext)

  // use Effect for change in results count
  useEffect(() => {
    getPokemons()
  }, [PokeStore.pokeCount])

  // useEffect for serach
  useEffect(() => {
    let newFiltrdPokemons;
    if(PokeStore.typeFilters.length > 0) {
      newFiltrdPokemons = pokemonsList.filter((pokemon) => {
        return pokemon.types.some(type => {
          return PokeStore.typeFilters.includes(type.type.name)
        })
      })
  
      setFilterPokemons(newFiltrdPokemons)
    }
    else 
      newFiltrdPokemons = pokemonsList.filter((pokemons) => {
        return pokemons.name.toLowerCase().includes(searchStr)
      })

    setFilterPokemons(newFiltrdPokemons)
  }, [pokemonsList, searchStr, PokeStore.typeFilters])

  function getPokemons() {
    setLoading(true)
    fetch(constants.POKEMON_BASE_API + PokeStore.resultCount + "&offset=" + PokeStore.pokeCount)
    .then(response => response.json())
    .then(result => {
      result.results.map((pokemon, index) => {
        getPokemonData(pokemon.url, result.results.length === index + 1)
      })
    })
  }

  function getPokemonData(pokemonUrl, lastItem) {
    fetch(pokemonUrl)
    .then(response => response.json())
    .then(result => {
      setPokemons(prevPokemonList =>  [...prevPokemonList, result])
      if(lastItem)
        setLoading(false)
    })
  }

  function changeFilter(newFilterCount) {
    PokeStore.changeResultCount(newFilterCount)
    setPokemons([])
  }

  function nameFilter(searchFor) {
    setSerachStr(searchFor.toLowerCase())
  }

  return (
    <div>
      {/* search section */}
      <Search SearchFilter={(filterString) => nameFilter(filterString)} />

      {/* Filters to change pokemon list */}
      <Filters setFilter={(updateCount) => changeFilter(updateCount)}/>

      {/* Pokemons list cards */}
      <div className="pokemonsListContr">
        { filterPokemons.length > 0 &&
          filterPokemons.map(pokemon => {
            return <div key={"pokeCard"+ pokemon.id}>
              <PokeCard pokeInfo={pokemon}/>
            </div>
          })
        }
      </div>

      {/* Loading */}
      {loading && <Loading />}
    </div>
  );
}

export default observer(Pokemons);