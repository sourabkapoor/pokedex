import React, { useContext } from "react"
import "./filters.scss"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import constants from "../../config/constants";
import FilterTags from "./filterTags";
import { PokeStoreContext } from "../../mobx/store";

const Filters = (props) => {
  const PokeStore = useContext(PokeStoreContext)

  const [showPokeType, setShowPokeType] = React.useState(null);
  const [showPokeResultCount, setPokeResultCount] = React.useState(null);
  const [pokeTypeFilterArr, setPokeTypeFilter] = React.useState([]);
  
  const TypeOpen = Boolean(showPokeType);
  const resultCountOpen = Boolean(showPokeResultCount);

  function setResultCountFilter(e) {
    if(e.target.innerText !== "")
      props.setFilter(e.target.innerText)
    setPokeResultCount(null);
  }

  const handleTypeSelect = (event) => {
    setShowPokeType(event.currentTarget);
  }

  const handleResultCountSelect = (event) => {
    setPokeResultCount(event.currentTarget);
  }

  function handleClose(e) {
    if(e.target.innerText !== "")
      setPokeTypeFilter([...PokeStore.typeFilters, e.target.innerText.toLowerCase()])
    setShowPokeType(null);
  }

  return(
    <div className="filtersContr">
      {/* filter by type */}
      <div className="filterByTypeCntr">
        <Button
          id="filterTypebtn"
          className="filterTypBtn"
          aria-controls={TypeOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={TypeOpen ? 'true' : undefined}
          onClick={handleTypeSelect}
        >
          Filter by type
        </Button>
        <Menu
          id="filterTypebtn"
          anchorEl={showPokeType}
          open={TypeOpen}
          onClose={(e) => handleClose(e)}
          MenuListProps={{
            'aria-labelledby': 'filterTypebtn',
          }}
        >
          {constants.POKEMON_TYPES.filter((pokeFilter) => {
            return !PokeStore.typeFilters.includes(pokeFilter) 
          }).map((pokeType, index) => {
            return <MenuItem 
              className="typeMenuItem"
              dense
              key={"pokemonType" + index}
              onClick={(e) => handleClose(e)}
            >
              {pokeType}
            </MenuItem>
          })}
        
        </Menu>

        <FilterTags typeFilters={pokeTypeFilterArr} />
      </div>
      
      {/* Result count filter */}
      <div className="resultCountCntr">
        <Button
            id="resultCountBtn"
            className="resultCountBtn"
            aria-controls={resultCountOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={resultCountOpen ? 'true' : undefined}
            onClick={handleResultCountSelect}
          >
            Result Count
          </Button>
          <Menu
            id="resultCountBtn"
            anchorEl={showPokeResultCount}
            open={resultCountOpen}
            onClose={(e) => setResultCountFilter(e)}
            MenuListProps={{
              'aria-labelledby': 'resultCountBtn',
            }}
          >
            <MenuItem 
              dense
              onClick={(e) => setResultCountFilter(e)}
            >
              10
            </MenuItem>
            <MenuItem 
              dense
              onClick={(e) => setResultCountFilter(e)}
            >
              20
            </MenuItem>        
            <MenuItem 
              dense
              onClick={(e) => setResultCountFilter(e)}
            >
              30
            </MenuItem>                
        </Menu>
      </div>
      {/* <span className="resultCountFilter">
        <h6>Result Count: </h6>
        <div 
          className={active === 10 ? "activeFilter" : ""} 
          onClick={() => setResultCountFilter(10)}
        >10</div>
        <div 
          className={active === 20 ? "activeFilter" : ""} 
          onClick={() => setResultCountFilter(20)}
        >20</div>
        <div 
          className={active === 30 ? "activeFilter" : ""} 
          onClick={() => setResultCountFilter(30)}
        >30</div>
      </span> */}

    </div>
  );
}

export default Filters;