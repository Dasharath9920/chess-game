import actionTypes from "./actionTypes"

const initializer = {
    turn: 'p1',
    board: [],
    activeBlock: {},
    dummy: 'dummy',
    p1_pieces: [],
    p2_pieces: [],
    screenMessage: '',
    isCheckMate: false
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

        case actionTypes.KILL_P1_PIECE: {
            return {...state, p1_pieces: action.p1_pieces};
        }

        case actionTypes.KILL_P2_PIECE: {
            return {...state, p2_pieces: action.p2_pieces};
        }

        case actionTypes.SCREEN_MESSAGE: {
            return {...state, screenMessage: action.screenMessage};
        }

        case actionTypes.CHECKMATE: {
            return {...state, isCheckMate: action.isCheckMate};
        }

        default:
            return state;
    }
}

export default updateProperties;