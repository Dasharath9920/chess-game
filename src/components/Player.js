import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPieceImage } from './helper';

function Player({player}) {

  const myState = useSelector(state => state.updateProperties);
  const [lostPieces, setLostPieces] = useState(player === 'p1'? myState.p1_pieces: myState.p2_pieces);

  useEffect(() => {
    if(player === 'p1'){
        setLostPieces(myState.p1_pieces);
    }
    else{
        setLostPieces(myState.p2_pieces);
    }
    if(player === myState.turn){
        let id = 'player' + player[1], id2 = 'player' + (player[1]==='1'? '2': '1');
        document.getElementById(id).style.border = '5px solid rgb(134, 197, 7)';
        document.getElementById(id2).style.border = '5px solid beige';
    }
  }, [myState.turn]);

  return (
    <div id={'player' + player[1]}>
        <h3>Player {player[1]}</h3>
        <div className="player-lost-pieces">
            {
                lostPieces.map((piece,index) => {
                    return <img src={getPieceImage(player,piece)} key={index} alt="img" />
                })
            }
        </div>
    </div>
  )
}

export default Player;