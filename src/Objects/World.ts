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
        if (map.horizontalNumber * map.verticalNumber > tankLocation || tankLocation >= 0) {
            this._map = map;
            this._tankLocation = tankLocation;
            this._tankPosition = tankPosition;
            this._states = [{
                order: "start",
                location: this._tankLocation,
                position: this._tankPosition
            }];
        } else {
            throw "TankがMap上にありません";
        }
    }
}

export default World;