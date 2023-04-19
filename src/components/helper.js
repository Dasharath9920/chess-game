
export const hash = (r, c) => {
	return 2001*(r+1000)*(c+1000);
}

export const getColor = (r,c,board) => {
	if(!r)
		return c%2 === 0? 1: 0;
	return 1-board[r-1][c].color;
}

export const getItemAt = (r,c) => {
    let player = r < 2? 'p1': 'p2';
    let piecesInRow = ['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'];

    if(r === 1 || r === 6){
        return {
            'player': player,
            'piece': 'pawn',
            'image': getPieceImage(player,'pawn')
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

export const mapCoordinatesToKey = () => {
    let map = new Map();
    for(let r = 0; r < 8; r++){
        for(let c = 0; c < 8; c++){
            let has = hash(r,c);
            map.set(has,{
                r,c
            })
        }
    }
    return map;
}

export const getPieceImage = (player, piece) => {
    if(player === 'p1'){
        switch(piece){
            case 'pawn': {
                return 'https://img.icons8.com/fluency-systems-regular/48/null/pawn--v1.png';
            }
            case 'Rook': {
                return 'https://img.icons8.com/fluency-systems-regular/48/null/rook.png';
            }
            case 'Knight': {
                return 'https://img.icons8.com/ios/50/null/knight.png';
            }
            case 'Bishop': {
                return 'https://img.icons8.com/ios/50/null/bishop.png';
            }
            case 'Queen': {
                return 'https://img.icons8.com/ios/50/null/queen.png';
            }
            default: {
                return 'https://img.icons8.com/wired/64/null/king.png';
            }
        }
    }
    else{
        switch(piece){
            case 'pawn': {
                return 'https://img.icons8.com/fluency-systems-filled/48/null/pawn.png';
            }
            case 'Rook': {
                return 'https://img.icons8.com/fluency-systems-filled/48/null/rook.png';
            }
            case 'Knight': {
                return 'https://img.icons8.com/ios-filled/50/null/knight.png';
            }
            case 'Bishop': {
                return 'https://img.icons8.com/ios-filled/50/null/bishop.png';
            }
            case 'Queen': {
                return 'https://img.icons8.com/ios-filled/50/null/queen.png';
            }
            default: {
                return 'https://img.icons8.com/glyph-neue/64/null/king.png';
            }
        }
    }
}