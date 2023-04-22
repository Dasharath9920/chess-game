import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { possibleMoves, resetBoardColors, isCheckMate, isMovePossibleToBreakCheckmate, highLightBlock, isMovePossible, getKingPosition, anyMovePossible } from './helper';
import { chessPieces, colorStatus } from './chessUtils';
import actionTypes from '../reducers/actionTypes';

function Board() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();
  let board = myState.board;

  const takeAction = (block) => {
	let activeBlock = myState.activeBlock;
	let opponentPlayer = myState.turn === 'p1'? 'p2': 'p1';

	// If any piece is killed, add them to the players lost pieces list
	if(block.item?.piece !== '-'){
		if(myState.turn === 'p1'){
			let lostPieces = myState.p2_pieces;
			lostPieces.push(block.item.piece);

			dispatch({
				type: actionTypes.KILL_P2_PIECE,
				p2_pieces: lostPieces
			})
		}
		else{
			let lostPieces = myState.p1_pieces;
			lostPieces.push(block.item.piece);

			dispatch({
				type: actionTypes.KILL_P1_PIECE,
				p1_pieces: lostPieces
			})
		}
	}

	// Copy source block to destination block and clear the source block
	block.item = {...activeBlock.item};
	board[activeBlock.r][activeBlock.c].item = {
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
		turn: opponentPlayer
	})

	dispatch({
		type: actionTypes.ACTIVE_BLOCK,
		activeBlock: {}
	});
  }

  const showPossibleMoves = (block) => {
	if(myState.gameOver){
		return;
	}

	let opponentPlayer = myState.turn === 'p1'? 'p2': 'p1';
	// If one of the possible moves block is selected, make a move
	if([colorStatus.colorKill,colorStatus.colorSafe].includes(document.getElementById(block.key).style.backgroundColor) && block.item.player !== myState.turn){

		if(!isMovePossible(myState.turn, myState.activeBlock, block, board)){
			highLightBlock(getKingPosition(myState.turn, board),colorStatus.colorKill);
			return;
		}

		takeAction(block);
		resetBoardColors(board);

		// Check for a checkMate after this move
		let isCheck = isCheckMate(myState.turn, board);
		let isAnyMovePossible = anyMovePossible(opponentPlayer,board);

		if(!isAnyMovePossible || isCheck){
			if(isAnyMovePossible && isCheck){
				highLightBlock(isCheck,colorStatus.colorKill);
			}
			
			if(!isAnyMovePossible || !isMovePossibleToBreakCheckmate(opponentPlayer,board)){
				let winner = !isAnyMovePossible? myState.turn[1]: (myState.turn === 'p1'? '2': '1');
				dispatch({
					type: actionTypes.CHECKMATE,
					isCheckMate: {},
					screenMessage: 'Game Over. Player' + winner + ' won the game.'
				})

				dispatch({
					type: actionTypes.GAME_OVER,
					gameOver: true
				})
			}
			else{
				dispatch({
					type: actionTypes.CHECKMATE,
					isCheckMate: {
						'checkMateBlock': block,
						'kingPosition': isCheck
					},
					screenMessage: 'CheckMate to Player' + (myState.turn === 'p1'? '2': '1')
				})
			}
		}
		else{
			dispatch({
				type: actionTypes.CHECKMATE,
				isCheckMate: {},
				screenMessage: ''
			});
		}
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
		let color = move.canKill? colorStatus.colorKill: colorStatus.colorSafe;
		highLightBlock(move,color,'1px solid grey');
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