import React from "react";
import TagColorSelector from "../../functions/tagColorSelector";
import "./pokemonModal.scss"
import Modal from '@mui/material/Modal'

const PokemonModal = ({pokeInfo, handleModalClose}) => {
  const {name, id, sprites, types, stats, height, weight, moves} = pokeInfo;

  return <Modal
  open={true}
  onClose={handleModalClose}
>
  <div className="pokeModalBody">
    <div className="pokeName">{name}</div>
    <img src={sprites.front_default} alt={"..."} className="pokeImg" />

    <div className="pokeInfoContr">
      {/* Pokemon type */}
      <div className="pokemonTypeContr">
        <h6 className="statHeading">Type:</h6>
        {
          types.map((pokeType, index) => {
            var tagbgColor = TagColorSelector(pokeType.type.name)
            return <p key={"pokemonType" + id + index} style={{backgroundColor: tagbgColor}}>
              {pokeType.type.name}
            </p>
          })
        }
      </div>

      <div className="pokePhyicalStat">
        <p>Height: <span>{height}</span></p>
        <p>Weight: <span>{weight}</span></p>
      </div>

      {/* Pokemon stats */}
      <div className="pokeStatOuterContr">
        <h6 className="statHeading">Scores:</h6>

        <div className="pokeStatContr">
          {
            stats.map((pokeStat, index) => {
              return <div className="pokeStatSubContr" key={"pokemonStat" + id + index}>
                <div className="statCount">{pokeStat.base_stat}</div>
                <div className="statName">{pokeStat.stat.name}</div>
              </div>
            }) 
          }
        </div>
      </div>

      {/* pokemon attacks */}
      <div className="pokeAttcksContr">
        <h6 className="statHeading">Attacks:</h6>
        <div className="pokeAttacksList">
          {moves.splice(0, 8).map(attack => attack.move.name).toString().replaceAll(",", ", ")}
        </div>
      </div>

    </div>
  </div>
</Modal>
}

export default PokemonModal;