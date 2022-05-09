import React, { useContext } from "react"
import { Button } from "@mui/material"
import "./footer.scss"
import { observer } from "mobx-react-lite";
import { PokeStoreContext } from "../../mobx/store";

 
const Footer = () => {
  const PokeStore = useContext(PokeStoreContext)

  const showMoreClicked = () => {
    PokeStore.changePokeCount()
  } 

  return <div className="footerContr">
    <Button 
      className="footerBtn" 
      variant="outlined"
      onClick={showMoreClicked}
    >Show more</Button>
  </div>
}

export default observer(Footer);