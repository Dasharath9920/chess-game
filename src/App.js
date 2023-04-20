import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Board from './components/Board';
import { useEffect } from 'react';
import { hash, getColor, getItemAt, resetBoard } from './components/helper';
import actionTypes from './reducers/actionTypes';
import Player from './components/Player';
import Controls from './components/Controls';

function App() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch()

  const initializeBoard = () => {
    let board = resetBoard();

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
      <Player player='p1'/>
      <div className='home'>
        <Board />
        <Controls />
      </div>
      <Player player='p2'/>
    </div>
  );
}

export default App;
