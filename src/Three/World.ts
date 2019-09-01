import Map from "../Objects/Map";
import WebGL from "../Three/WebGL";
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
    private _webGl: WebGL;

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

        // WebGL
        this._webGl = new WebGL(map.horizontalNumber, 1000, map, tankLocation, tankPosition);


        // DOM(button)
        this.goForwardTank = this.goForwardTank.bind(this);
        this.turnLeftTank = this.turnLeftTank.bind(this);
        this.turnRightTank = this.turnRightTank.bind(this);

        const goForwardTankButton = document.createElement('button');
        goForwardTankButton.textContent = "前に進む";
        goForwardTankButton.onclick = this.goForwardTank;
        document.body.appendChild(goForwardTankButton);

        const turnRightTankButton = document.createElement('button');
        turnRightTankButton.textContent = "右に回る";
        turnRightTankButton.onclick = this.turnRightTank;
        document.body.appendChild(turnRightTankButton);

        const turnLeftTankButton = document.createElement('button');
        turnLeftTankButton.textContent = "左に回る";
        turnLeftTankButton.onclick = this.turnLeftTank;
        document.body.appendChild(turnLeftTankButton);

        console.log("tankをマップ上に配置しました。");
        this.print();
    }

    turnRightTank() {
        this._tankPosition = (this._tankPosition + 1) % 4;
        this._webGl.turnRight();

        const state = {
            order: "turnRight",
            location: this._tankLocation,
            position: this._tankPosition
        };

        this._states.push(state);
        return Object.assign({}, state);
    }

    turnLeftTank() {
        if (this._tankPosition <= 0) {
            this._tankPosition = 3;
        } else {
            this._tankPosition = this._tankPosition - 1;
        }

        this._webGl.turnLeft();

        const state = {
            order: "turnLeftTank",
            location: this._tankLocation,
            position: this._tankPosition
        };

        this._states.push(state);
        return Object.assign({}, state);
    }

    // 前に1マス進む
    goForwardTank(): State {
        if (!this.isRoute()) {
            throw "前に進めません";
        }

        this._webGl.moveTank(this.getForwardLocation(), this._tankPosition, this._tankLocation);
        this._tankLocation = this.getForwardLocation();

        const state = {
            order: "goForwardTank",
            location: this._tankLocation,
            position: this._tankPosition
        };

        this._states.push(state);
        return Object.assign({}, state);
    }

    log() {
        console.log(this._states);
    }

    print() {
        let displayStrings = Array.from(this._map.getDisplayStrings());
        let tankChar: string;

        switch(this._tankPosition) {
            case Position.Top:
                tankChar = "上";
                break;
            case Position.Right:
                tankChar = "右";
                break;
            case Position.Bottom:
                tankChar = "下";
                break;
            case Position.Left:
                tankChar = "左";
                break;
        }

        displayStrings[this.getDisplayLocation()] = tankChar;

        let text = "";

        for (let i = 0; i < this._map.horizontalNumber * 3; i++) {
            for (let j = 0; j < this._map.verticalNumber * 3; j++) {
                text += displayStrings[j + i * this._map.horizontalNumber * 3];
            }

            text += "\n";
        }

        console.log(text);
    }

    // 描画上のタンクの位置
    private getDisplayLocation() {
        const y = Math.floor(this._tankLocation / this._map.horizontalNumber);
        const x = this._tankLocation - y * this._map.horizontalNumber;
        return (1 + 3 * y) * this._map.horizontalNumber * 3 + (1 + 3 * x);
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