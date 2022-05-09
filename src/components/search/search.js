import React from "react"
import "./search.scss"
import { TextField } from "@mui/material";

function Search(props) {

  const searchChange = (e) => {
    props.SearchFilter(e.target.value)
  }

  return (
    <div className="searchContr">
      <TextField
        className="searchField"
        id="filled-search"
        type="search"
        size="small"
        placeholder="Search pokemon"
        onChange={searchChange}
      />
    </div>
  );
}

export default Search