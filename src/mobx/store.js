import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";

class PokeStore {
  pokemonId = 1
  pokeCount = 0
  resultCount = 10
  typeFilters = []

  constructor() {
    makeObservable(this, {
      pokemonId: observable,
      pokeCount: observable,
      typeFilters: observable,
      changePokeCount: action,
      changeResultCount: action,
      addPokeFilter: action,
      removePokeFilter: action,
    })
  }
  // Pokemon count updater according to results count
  changePokeCount() {
    this.pokeCount = this.pokeCount + this.resultCount
  }

  // Control the results count to show
  changeResultCount(newResultCount) {
    this.resultCount = newResultCount
    this.pokeCount = 0
  }

  // Add a new type filter
  addPokeFilter(filterArr) {
    this.typeFilters = filterArr
  }

  // Remove a type filter
  removePokeFilter(filterStr) {
    this.typeFilters = this.typeFilters.filter((pokeFilter) => {
      return pokeFilter !== filterStr
    })
  }
}

export const PokeStoreContext = createContext(new PokeStore());