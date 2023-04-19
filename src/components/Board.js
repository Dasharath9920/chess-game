import React from 'react';
import { useSelector } from 'react-redux';

function Board() {

  let myState = useSelector(state => state.updateProperties);
  let board = myState.board;

  console.log('here: ',board)

  return (
    <div className='board'>
		{
			board.map((row) => {
				return <div className='board-row'>
					{
						row.map((block) => {
							return  <div className='block' key={block.key} style={{backgroundColor: block.color? 'white': 'grey'}}>{block.item.player !== '-'? block.item.piece: ''}</div>
						})
					}
				</div>
			})
		}
    </div>
  )
}

export default Board;