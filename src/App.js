import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Board from './components/Board';
import { useEffect } from 'react';
import { hash, getColor, getItemAt } from './components/helper';
import actionTypes from './reducers/actionTypes';

function App() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch()

  const initializeBoard = () => {
    let board = []

    for(let r = 0; r < 8; r++){
      let row = []
      for(let c = 0; c < 8; c++){
        row.push({
          key: hash(r,c),
          color: getColor(r,c,board),
          item: getItemAt(r,c),
          r,c
        })
      }
      board.push(row)
    }

    dispatch({
      type: actionTypes.UPDATE_BOARD,
      board: board
    })
  }

  useEffect(() => {
    initializeBoard();
  },[myState.dummy])

  return (
    <div className="app">
      <Board />
    </div>
  );
}

export default App;
