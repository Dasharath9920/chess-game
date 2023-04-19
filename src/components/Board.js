import React from 'react';
import { useSelector } from 'react-redux';
import { possibleMoves } from './helper';

function Board() {

  let myState = useSelector(state => state.updateProperties);
  let board = myState.board;

  const showPossibleMoves = (block) => {
	let moves = possibleMoves(block.r, block.c, block.item.piece, block.item.player, board);
	console.log('moves: ',moves)
  }

  return (
    <div className='board'>
		{
			board.map((row,index) => {
				return <div className='board-row' key={index}>
					{
						row.map((block) => {
							return  <div className='block' onClick={() => showPossibleMoves(block)} key={block.key} style={{backgroundColor: block.color? 'white': 'grey'}}>{
								block.item.player !== '-' && <img src={block.item.image} alt='img'/>
							}</div>
						})
					}
				</div>
			})
		}
    </div>
  )
}

export default Board;