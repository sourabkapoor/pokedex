import React from "react"
import TagColorSelector from "../../functions/tagColorSelector";
import "./pokeCard.scss"
import PokemonModal from "../pokemonModal.js/pokemonModal";

const PokeCard = ({pokeInfo}) => {
  const {name, id, sprites, types, stats} = pokeInfo;
  const [infoModalOpen, setInfoModalOpen] = React.useState(false)

  const handleModalClose = () => {
    setInfoModalOpen(false)
  }

  return ( 
    <>
      <div className="pokeCardContr" key={"PokemonCard"+ id} onClick={() => setInfoModalOpen(true)}>
        <img src={sprites.front_default} alt={"..."} className="pokeImg" />
        <div className="name">{name}</div>
        
        {/* Pokemon type */}
        <div className="pokemonTypeContr">
          {
            types.map((pokeType, index) => {
              var tagbgColor = TagColorSelector(pokeType.type.name)
              return <p key={"pokemonType" + id + index} style={{backgroundColor: tagbgColor}}>
                {pokeType.type.name}
              </p>
            })
          }
        </div>

        {/* Pokemon stats */}
        <div className="pokeStatContr">
          {
            stats.map((pokeStat, index) => {
              {/* Index is 3 for first 3 states i.e hp, attack & defence */}
              if(index < 3)
                return <div className="pokeStatSubContr" key={"pokemonStat" + id + index}>
                  <div className="statCount">{pokeStat.base_stat}</div>
                  <div className="statName">{pokeStat.stat.name}</div>
                </div>
            }) 
          }
        </div>
      </div>

      {
        infoModalOpen &&
          <PokemonModal pokeInfo={pokeInfo} handleModalClose={handleModalClose}/>
      } 
    </>
  );
}

export default PokeCard