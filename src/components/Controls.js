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
    }
  }

  useEffect(() => {
    clearInterval(timer);

    if(myState.screenMessage.length){
      document.getElementById('mask').style.animation = 'none';
      document.getElementById('screen').style.fontSize = '1.5rem';
    }
    else{
      document.getElementById('mask').style.animation = 'animate 20s linear infinite';
      document.getElementById('screen').style.fontSize = '1.3rem';

      timer = setInterval(() => {
        let newQuoteNumber = (quoteNumber + 1)%quotes.length;
        setQuoteNumber(newQuoteNumber+1);
      },20000);
    }
  },[myState.screenMessage]);

  return (
    <div className='controls'>
        <button onClick={() => restartGame()}>Restart <img src="https://img.icons8.com/sf-black/64/null/recurring-appointment.png" alt="reset" /></button>
        <div id="screen">{myState.screenMessage.length > 0? myState.screenMessage: quotes[quoteNumber]} <div id='mask'></div></div>
    </div>
  )
}

export default Controls;