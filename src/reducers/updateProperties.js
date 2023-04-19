import actionTypes from "./actionTypes"

const initializer = {
    turn: 'p1',
    board: [],
    dummy: 'dummy'
}

const updateProperties = (state = initializer,action) => {
    switch(action.type){
        case actionTypes.UPDATE_BOARD: {
            return {...state, board: action.board};
        }

        case actionTypes.UPDATE_TURN: {
            return {...state, turn: action.turn};
        }

        default:
            return state;
    }
}

export default updateProperties;