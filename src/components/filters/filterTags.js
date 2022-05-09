import React, { useContext, useEffect } from "react";
import "./filters.scss"
import { observer } from "mobx-react-lite";
import { PokeStoreContext } from "../../mobx/store";
import TagColorSelector from "../../functions/tagColorSelector";

const FilterTags = ({typeFilters}) => {
  const PokeStore = useContext(PokeStoreContext)

  useEffect(() => {
    if(typeFilters.length > 0) {
      PokeStore.addPokeFilter(typeFilters);
    }

  }, [typeFilters])

  return <div className="typeFilterContr">
    {PokeStore.typeFilters.map((pokeFilter, index) => {
      var tagbgColor = TagColorSelector(pokeFilter)
      return <div className="filterTag" style={{backgroundColor: tagbgColor}} key={"pokeFilterType" + index}>
        <h3 className="filterName">{pokeFilter}</h3>
        <div className="filterDel" 
          onClick={() => PokeStore.removePokeFilter(pokeFilter)}
        >X</div>
      </div>
    })}

    {
      PokeStore.typeFilters.length === 0 && 
      <p className="noFilterStr">No filter added!</p>
    }
  </div>
}

export default observer(FilterTags)