import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hash, possibleMoves, resetBoardColors } from './helper';
import { chessPieces, colorStatus } from './chessUtils';
import actionTypes from '../reducers/actionTypes';

function Board() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();
  let board = myState.board;

  const takeAction = (block) => {
	let activeBlock = myState.activeBlock;

	// Copy source block to destination block and clear the source block
	block.item = {...activeBlock.item};
	activeBlock.item = {
		'player': '-',
		'piece': '-',
		'image': '-'
	}

	// If pawn moves double step for the first time, then deactivate its double step chance
	if(block.item.piece === chessPieces.PAWN && Math.abs(block.r - activeBlock.r) === 2){
		block.item.firstTime = false;
	}

	dispatch({
		type: actionTypes.UPDATE_BOARD,
		board: board
	})

	// Toggle the players turn
	dispatch({
		type: actionTypes.UPDATE_TURN,
		turn: myState.turn === 'p1'? 'p2': 'p1'
	})
  }

  const showPossibleMoves = (block) => {
	// If one of the possible moves block is selected, make a move
	if([colorStatus.colorKill,colorStatus.colorSafe].includes(document.getElementById(block.key).style.backgroundColor)){
		takeAction(block);
		resetBoardColors(board);
		return;
	}
	else if(block.item.player === '-' || block === myState.activeBlock || block.item.player !== myState.turn){
		resetBoardColors(board);
		dispatch({
			type: actionTypes.ACTIVE_BLOCK,
			activeBlock: {}
		});
		return;
	}

	resetBoardColors(board);

	let moves = possibleMoves(block.r, block.c, block.item.piece, block.item.player, board);

	// Color all possible moves with respected colors
	moves.forEach((move) => {
		let cell = document.getElementById(hash(move.r, move.c));
		cell.style.backgroundColor = move.canKill? colorStatus.colorKill: colorStatus.colorSafe;
		cell.style.border = '1px solid grey';
	})

	dispatch({
		type: actionTypes.ACTIVE_BLOCK,
		activeBlock: block
	});
  }

  return (
    <div className='board'>
		{
			board.map((row,index) => {
				return <div className='board-row' key={index}>
					{
						row.map((block) => {
							return  <div className='block' id={block.key} onClick={() => showPossibleMoves(block)} key={block.key} style={{backgroundColor: block.color}}>{
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