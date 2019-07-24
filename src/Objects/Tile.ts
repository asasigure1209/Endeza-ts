export type Positions = {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean
}

class Tile {
    private _positions: Positions;

    constructor(positions: Positions) {
        this._positions = positions;
    }

    get positions() {
        return Object.assign({}, this._positions);
    }
}

export default Tile