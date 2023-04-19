import actionTypes from "./actionTypes"

const initializer = {
    turn: 'p1',
    board: [],
    activeBlock: {},
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

        case actionTypes.ACTIVE_BLOCK: {
            return {...state, activeBlock: action.activeBlock};
        }

        default:
            return state;
    }
}

export default updateProperties;