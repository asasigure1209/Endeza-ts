export type Positions = {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean
}

class Tile {
    positions: Positions;

    constructor(positions: Positions) {
        this.positions = positions;
    }
}

export default Tile