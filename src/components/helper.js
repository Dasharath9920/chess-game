import { chessPieces } from "./chessUtils";

export const quotes = [
    'To live is the rarest thing in the world. Most people exist, that is all.',
    'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    'It is better to be hated for what you are than to be loved for what you are not.',
    'The way to get started is to quit talking and begin doing. -Walt Disney',
    'The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt',
    'The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela',
    'Never let the fear of striking out keep you from playing the game. -Babe Ruth',
    'The only impossible journey is the one you never begin. -Tony Robbins',
    'I find that the harder I work, the more luck I seem to have. -Thomas Jefferson',
    'Failure is an option here. If things are not failing, you are not innovating enough. - Elon Musk'
]

// Returns unique hash key of two values
export const hash = (r, c) => {
	return 2001*(r+1000) + (c+1000);
}

// Returns the color of a cell in a chess board at given coordinates
export const getColor = (r,c,board) => {
	if(!r)
		return c%2 === 0? 'white': 'grey';
	return board[r-1][c].color === 'white'? 'grey': 'white';
}

// Function that resets the chess board colors
export const resetBoardColors = (board) => {
    for(let r = 0; r < 8; r++){
        for(let c = 0; c < 8; c++){
          let cell = document.getElementById(hash(r,c));
          cell.style.backgroundColor = board[r][c].color;
          cell.style.border = 'none';
        }
    }
}

// Function that returns the actual chess piece and its properties at a given position at starting stage
export const getItemAt = (r,c) => {
    let player = r < 2? 'p1': 'p2';
    let piecesInRow = [chessPieces.ROOK,chessPieces.KNIGHT,chessPieces.BISHOP,chessPieces.QUEEN,chessPieces.KING,chessPieces.BISHOP,chessPieces.KNIGHT,chessPieces.ROOK];

    if(r === 1 || r === 6){
        return {
            'player': player,
            'piece': chessPieces.PAWN,
            'image': getPieceImage(player,chessPieces.PAWN),
            'firstTime': true
        }
    }
    else if(!r || r === 7){
        return {
            'player': player,
            'piece': piecesInRow[c],
            'image': getPieceImage(player,piecesInRow[c])
        }
    }
    else{
        return {
            'player': '-',
            'piece': '-',
            'image': '-'
        }
    }
}

// Function that returns image of a chess piece of a particular player
export const getPieceImage = (player, piece) => {
    if(player === 'p1'){
        switch(piece){
            case chessPieces.PAWN: {
                return 'https://img.icons8.com/fluency-systems-regular/48/null/pawn--v1.png';
            }
            case chessPieces.ROOK: {
                return 'https://img.icons8.com/fluency-systems-regular/48/null/rook.png';
            }
            case chessPieces.KNIGHT: {
                return 'https://img.icons8.com/ios/50/null/knight.png';
            }
            case chessPieces.BISHOP: {
                return 'https://img.icons8.com/ios/50/null/bishop.png';
            }
            case chessPieces.QUEEN: {
                return 'https://img.icons8.com/ios/50/null/queen.png';
            }
            default: {
                return 'https://img.icons8.com/wired/64/null/king.png';
            }
        }
    }
    else{
        switch(piece){
            case chessPieces.PAWN: {
                return 'https://img.icons8.com/fluency-systems-filled/48/null/pawn.png';
            }
            case chessPieces.ROOK: {
                return 'https://img.icons8.com/fluency-systems-filled/48/null/rook.png';
            }
            case chessPieces.KNIGHT: {
                return 'https://img.icons8.com/ios-filled/50/null/knight.png';
            }
            case chessPieces.BISHOP: {
                return 'https://img.icons8.com/ios-filled/50/null/bishop.png';
            }
            case chessPieces.QUEEN: {
                return 'https://img.icons8.com/ios-filled/50/null/queen.png';
            }
            default: {
                return 'https://img.icons8.com/glyph-neue/64/null/king.png';
            }
        }
    }
}

// Check if coordinates are within chess board
const isSafe = (r,c) => {
    return r >= 0 && c >= 0 && r < 8 && c < 8;
}

// Function that returns object
const newMoveObject = (r,c,canKill) => {
    return {
        'r': r,
        'c': c,
        'canKill': canKill
    };
}

// A reusable function that adds all the possible moves of Bishop or Rook
const addNewMoveObjectForBishopOrRook = (r,c,k1,k2,board,directions, player, obstacle) => {
    for(let i = 1; i <= 7; i++){
        let new_row = r + i*k1, new_col = c + i*k2;
        if(obstacle.r === new_row && obstacle.c === new_col){
            break;
        }

        if(isSafe(new_row,new_col)){
            if(board[new_row][new_col].item.piece === '-'){
                directions.push(newMoveObject(new_row,new_col,false));
            }
            else{
                if(board[new_row][new_col].item.player !== player){
                    directions.push(newMoveObject(new_row,new_col,true));
                }
                break;
            }
                
        }
    }
}

// Function that returns all the possible moves of a chess piece of a particular player
export const possibleMoves = (r, c, piece, player, board, obstacle = {'r': -1,'c': -1}) => {
    let directions = [], new_row = 0,new_col = 0;

    switch(piece){
        case chessPieces.PAWN: {
            let moves = player === 'p1'? [[1,0],[1,-1],[1,1]]: [[-1,0],[-1,-1],[-1,1]];

            for(let i = 0; i < 3; i++){
                new_row = moves[i][0] + r;
                new_col = moves[i][1] + c;

                if(isSafe(new_row,new_col)){
                    if(!i){
                        if(board[new_row][new_col].item.player === '-'){
                            directions.push(newMoveObject(new_row,new_col,false));

                            // Check for double step
                            if(board[r][c].item.firstTime){
                                if(player === 'p1' && isSafe(new_row+1,new_col) && board[new_row+1][new_col].item.player === '-'){
                                    directions.push(newMoveObject(new_row+1,new_col,false));
                                }
                                else if(player === 'p2' && isSafe(new_row-1,new_col) && board[new_row-1][new_col].item.player === '-'){
                                    directions.push(newMoveObject(new_row-1,new_col,false));
                                }
                            }
                        }
                    }
                    else if(board[new_row][new_col].item.player !== '-' && board[new_row][new_col].item.player !== player){
                        directions.push(newMoveObject(new_row,new_col,true))
                    }
                }
            }

            return directions;
        }

        case chessPieces.BISHOP: {
            addNewMoveObjectForBishopOrRook(r,c,1,1,board,directions, player, obstacle);
            addNewMoveObjectForBishopOrRook(r,c,-1,-1,board,directions, player, obstacle);
            addNewMoveObjectForBishopOrRook(r,c,-1,1,board,directions, player, obstacle);
            addNewMoveObjectForBishopOrRook(r,c,1,-1,board,directions, player, obstacle);

            return directions;
        }

        case chessPieces.KING: {
            let x_dir = [-1,-1,-1,0,0,1,1,1];
            let y_dir = [-1,0,1,-1,1,-1,0,1];

            for(let i = 0; i < 8; i++){
                new_row = x_dir[i] + r;
                new_col = y_dir[i] + c;

                if(isSafe(new_row,new_col)){
                    if(board[new_row][new_col].item.player === '-'){
                        directions.push(newMoveObject(new_row,new_col,false));
                    }
                    else if(board[new_row][new_col].item.player !== player){
                        directions.push(newMoveObject(new_row,new_col,true));
                    }
                }
            }

            return directions;
        }

        case chessPieces.KNIGHT: {
            let x_dir = [-2,-2,-1,-1,1,1,2,2];
            let y_dir = [-1,1,-2,2,-2,2,-1,1];

            for(let i = 0; i < 8; i++){
                new_row = x_dir[i] + r;
                new_col = y_dir[i] + c;

                if(isSafe(new_row,new_col)){
                    if(board[new_row][new_col].item.player === '-'){
                        directions.push(newMoveObject(new_row,new_col,false));
                    }
                    else if(board[new_row][new_col].item.player !== player){
                        directions.push(newMoveObject(new_row,new_col,true));
                    }
                }
            }

            return directions;
        }

        case chessPieces.ROOK: {
            addNewMoveObjectForBishopOrRook(r,c,0,1,board,directions, player, obstacle);
            addNewMoveObjectForBishopOrRook(r,c,1,0,board,directions, player, obstacle);
            addNewMoveObjectForBishopOrRook(r,c,0,-1,board,directions, player, obstacle);
            addNewMoveObjectForBishopOrRook(r,c,-1,0,board,directions, player, obstacle);

            return directions;
        }

        case chessPieces.QUEEN: {
            let BishopMoves = possibleMoves(r,c,chessPieces.BISHOP, player, board, obstacle);
            directions.push(...BishopMoves);
            let RookMoves = possibleMoves(r,c,chessPieces.ROOK, player, board, obstacle);
            directions.push(...RookMoves);

            return directions;
        }
    }
}

// Function that reset the chess board
export const resetBoard = () => {
    let board = []

    for(let r = 0; r < 8; r++){
      let row = []
      for(let c = 0; c < 8; c++){
        row.push({
          key: hash(r,c),
          color: getColor(r,c,board),
          item: getItemAt(r,c),
          r,c
        });

        let cell = document.getElementById(hash(r,c));
        if(cell){
            cell.style.backgroundColor = getColor(r,c,board);
        }
      }
      board.push(row)
    }

    return board;
}

// Function that returns true if there is a checkmate from player
export const isCheckMate = (player, board) => {
    for(let r = 0; r < 8; r++){
        for(let c = 0; c < 8; c++){
            let item = board[r][c].item;
            if(item.player === player){
                let moves = possibleMoves(r,c,item.piece, player, board);
                let checkFrom = moves.find((move) => {
                    let itemAtMove = board[move.r][move.c].item;
                    return (itemAtMove.player !== '-' && itemAtMove.player !== player && itemAtMove.piece === chessPieces.KING);
                })
                if(checkFrom){
                    return checkFrom;
                }
            }
        }
    }

    return null;
}

// Function to check whether any move possible to prevent checkmate
// Here player is the one who have to check for a possible move to avoid checkmate
export const isMovePossibleToBreakCheckmate = (player, board) => {
    for(let r = 0; r < 8; r++){
        for(let c = 0; c < 8; c++){
            let item = board[r][c].item;
            let sourceBlock = {r,c}
            // If chess piece belongs to opponent player
            if(item.player !== player && item.player !== '-'){
                let moves = possibleMoves(r,c,item.piece,player,board);
                for(let i = 0; i < moves.length; i++){
                    let move = moves[i];
                    if(isMovePossible(player,sourceBlock,move,board)){
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

// Function that returns the deep copy of the chess board
export const deepCopyBoard = (board) => {
    let copyBoard = [];
    for(let i = 0; i < 8; i++){
        let row = [];
        for(let j = 0; j < 8; j++){
            row.push({...board[i][j]});
        }
        copyBoard.push(row);
    }

    return copyBoard;
}

// Function that checks if current move possible without causing self checkMate
export const isMovePossible = (player,sourceBlock,destinationBlock,board) => {
    let opponentPlayer = player === 'p1'? 'p2': 'p1';
    
    // Make temporary move and check if this move results checkMate itself
    let copyBoard = deepCopyBoard(board);
    
    copyBoard[destinationBlock.r][destinationBlock.c].item = copyBoard[sourceBlock.r][sourceBlock.c].item;
    copyBoard[sourceBlock.r][sourceBlock.c].item = {
        'player': '-',
        'piece': '-',
        'image': '-'
    };
    
    let kingPosition = getKingPosition(player, copyBoard);

    if(kingPosition.r !== -1){
        return !Object.values(chessPieces).some((piece) => {
            let moves = possibleMoves(kingPosition.r, kingPosition.c, piece, player, copyBoard);
            for(let i = 0; i < moves.length; i++){
                let move = moves[i];
                let item = copyBoard[move.r][move.c].item;

                if(item.player === opponentPlayer && piece === item.piece){
                    return true;
                }
            }
            return false;
        })
    }

    return true;
}

// Function that highlights the given block with color and border
export const highLightBlock = (block,color, border = 'none') => {
    let cell = document.getElementById(hash(block.r,block.c));
    cell.style.backgroundColor = color;
    cell.style.border = border;
}

// Function that returns king position of a particular player
export const getKingPosition = (player, board) => {
    let position = {
        'r': -1,
        'c': -1
    };

    for(let r = 0; r < 8; r++){
        for(let c = 0; c < 8; c++){
            let item = board[r][c].item;
            if(item.player === player && item.piece === chessPieces.KING){
                return {
                    r,c
                }
            }
        }
    }

    return position;
}

// Function that checks if any move possible
export const anyMovePossible = (player, board) => {
    for(let r = 0; r < 8; r++){
        for(let c = 0; c < 8; c++){
            let item = board[r][c].item;
            if(item.player === player){
                let moves = possibleMoves(r,c,item.piece,player,board);
                let possibleMove = moves.some(move => isMovePossible(player,board[r][c],move,board));
                if(possibleMove){
                    return true;
                }
            }
        }
    }
    return false;
}