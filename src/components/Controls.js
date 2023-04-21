import React, { useEffect, useState } from 'react'
import actionTypes from '../reducers/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { quotes, resetBoard } from './helper';

function Controls() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();
  const [quoteNumber, setQuoteNumber] = useState(0);
  var timer;

  const restartGame = () => {

    if(window.confirm('Are you sure you want to restart the game?')){
        let board = resetBoard();
    
        dispatch({
          type: actionTypes.UPDATE_BOARD,
          board: board
        })
    
        dispatch({
            type: actionTypes.UPDATE_TURN,
            turn: 'p1'
        })

        dispatch({
          type: actionTypes.SCREEN_MESSAGE,
          screenMessage: ''
        })

        dispatch({
          type: actionTypes.GAME_OVER,
          gameOver: false
        })
    }
  }
  
  useEffect(() => {
    timer = setInterval(() => {
      let newQuoteNumber = (quoteNumber + 1)%quotes.length;
      setQuoteNumber(newQuoteNumber+1);
    },24000);
  })

  return (
    <div className='controls'>
        <button onClick={() => restartGame()}>Restart <img src="https://img.icons8.com/sf-black/64/null/recurring-appointment.png" alt="reset" /></button>
        <div id="screen">
          <div className='message'>{myState.screenMessage.length? myState.screenMessage: 'Chess Game'}</div>
          <div id='mask'>{quotes[quoteNumber]}</div>
        </div>
    </div>
  )
}

export default Controls;