
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
            'piece': 'pawn'
        }
    }
    else if(!r || r === 7){
        return {
            'player': player,
            'piece': piecesInRow[c]
        }
    }
    else{
        return {
            'player': '-',
            'piece': '-'
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