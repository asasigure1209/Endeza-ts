import Map from "./Map";
import { Position } from "../Enum/Position";

type State = {
    order: string,
    location: number,
    position: Position
}

class World {
    private _map: Map;
    private _tankLocation: number;
    private _tankPosition: Position;
    private _states: State[];

    constructor(map: Map, tankLocation: number, tankPosition: Position) {
        if (!(map.horizontalNumber * map.verticalNumber > tankLocation || tankLocation >= 0)) {
            throw "TankがMap上にありません";
        }

        this._map = map;
        this._tankLocation = tankLocation;
        this._tankPosition = tankPosition;
        this._states = [{
            order: "start",
            location: this._tankLocation,
            position: this._tankPosition
        }];

        this.goForwardTank = this.goForwardTank.bind(this);

        console.log(`初期: ${ this._states[0].location }`);
    }

    // 前に1マス進む
    goForwardTank(): State {
        if (!this.isRoute()) {
            throw "前に進めません";
        }

        this._tankLocation = this.getForwardLocation();

        const state = {
            order: "goForwardTank",
            location: this._tankLocation,
            position: this._tankPosition
        };

        this._states.push(state);
        return Object.assign({}, state);
    }

    private isRoute() {
        switch(this._tankPosition) {
            case Position.Top:
                return this._map.tiles[this._tankLocation].routes.top;
            case Position.Right:
                return this._map.tiles[this._tankLocation].routes.right;
            case Position.Bottom:
                return this._map.tiles[this._tankLocation].routes.bottom;
            case Position.Left:
                return this._map.tiles[this._tankLocation].routes.left;
        }
    }

    private getForwardLocation() {
        switch(this._tankPosition) {
            case Position.Top:
                return this._tankLocation - this._map.horizontalNumber;
            case Position.Right:
                return this._tankLocation + 1;
            case Position.Bottom:
                return this._tankLocation + this._map.horizontalNumber;
            case Position.Left:
                return this._tankLocation - 1;
            default:
                return this._tankLocation;
        }
    }
}

export default World;