import Map from "../Objects/Map";
import WebGL from "../Three/WebGL";
import { Position } from "../Enum/Position";
import Display from "../Objects/Display";
import * as http from 'http';

export type State = {
    order: string,
    location: number,
    position: Position,
    moveValue: number,
    sendOrder: number,
    function?: any
}

class World {
    private _map: Map;
    private _tankLocation: number;
    private _tankPosition: Position;
    private _goalLocation: number;
    private _states: State[];
    private _webGl: WebGL;
    private _point: number;

    constructor(map: Map, tankLocation: number, tankPosition: Position, goalLocation: number) {
        if (!(map.horizontalNumber * map.verticalNumber > tankLocation || tankLocation >= 0)) {
            throw "TankがMap上にありません";
        }

        if (!(map.horizontalNumber * map.verticalNumber > goalLocation || goalLocation >= 0)) {
            throw "GoalがMap上にありません";
        }

        if (goalLocation === tankLocation) {
            throw "Tankがすでにゴールにいます"
        }

        this._map = map;
        this._tankLocation = tankLocation;
        this._tankPosition = tankPosition;
        this._goalLocation = goalLocation;
        this._states = [{
            order: "start",
            location: this._tankLocation,
            position: this._tankPosition,
            sendOrder: -1,
            moveValue: 0
        }];
        this._point = 0;

        // WebGL
        this._webGl = new WebGL(map.horizontalNumber, 1000, map, tankLocation, tankPosition, goalLocation);


        // DOM(button)
        this.goForwardTank = this.goForwardTank.bind(this);
        this.turnLeftTank = this.turnLeftTank.bind(this);
        this.turnRightTank = this.turnRightTank.bind(this);
        this.goForwardTankToEnd = this. goForwardTankToEnd.bind(this);
        this.goWhile = this.goWhile.bind(this);
        this.reset = this.reset.bind(this);
        this.sendOrder = this.sendOrder.bind(this);
        this.log = this.log.bind(this);

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

        /*
        const goForwardTankToEndButton = document.createElement('button');
        goForwardTankToEndButton.textContent = "ぶつかるまで進む";
        goForwardTankToEndButton.onclick = this.goForwardTankToEnd;
        document.body.appendChild(goForwardTankToEndButton);

        const goWhileButton = document.createElement('button');
        goWhileButton.textContent= "ゴールまで繰り返す";
        goWhileButton.onclick = this.goWhile;
        document.body.appendChild(goWhileButton);
        */

       const resetTankButton = document.createElement('button');
       resetTankButton.textContent = "前に戻る";
       resetTankButton.onclick = this.reset;
       document.body.appendChild(resetTankButton);

        const sendOrderButton = document.createElement('button');
        sendOrderButton.textContent = "送信";
        sendOrderButton.onclick = this.sendOrder;
        document.body.appendChild(sendOrderButton);

        /*
        const logButton = document.createElement('button');
        logButton.textContent = "ログ";
        logButton.onclick = this.log;
        document.body.appendChild(logButton);
        */

        console.log("tankをマップ上に配置しました。");
        this.print();
    }

    turnRightTank() {
        this._tankPosition = (this._tankPosition + 1) % 4;
        this._webGl.turnRight();

        const state: State = {
            order: "右ニマワレ",
            location: this._tankLocation,
            position: this._tankPosition,
            sendOrder: 1,
            moveValue: 0,
            function: this.turnRightTank
        };

        Display.print(state);
        this._states.push(state);
        this.print();
        this.callGoal();
        return Object.assign({}, state);
    }

    turnLeftTank() {
        if (this._tankPosition <= 0) {
            this._tankPosition = 3;
        } else {
            this._tankPosition = this._tankPosition - 1;
        }

        this._webGl.turnLeft();

        const state: State = {
            order: "左ニマワレ",
            location: this._tankLocation,
            position: this._tankPosition,
            sendOrder: 3,
            moveValue: 0,
            function: this.turnLeftTank
        };

        Display.print(state);
        this._states.push(state);
        this.print();
        this.callGoal();
        return Object.assign({}, state);
    }

    // 前に1マス進む
    goForwardTank(): State {
        if (!this.isRoute()) {
            throw "前に進めません";
        }

        this._webGl.moveTank(1);
        this._tankLocation = this.getForwardLocation();

        const state: State = {
            order: "前ニススメ",
            location: this._tankLocation,
            position: this._tankPosition,
            sendOrder: 0,
            moveValue: 1,
            function: this.goForwardTank
        };
        this._point++;

        Display.print(state);
        this._states.push(state);
        this.print();
        this.callGoal();
        return Object.assign({}, state);
    }

    goForwardTankWithSquares(square: number) {
        let moveValue = 0;

        for (let i = 0; i < square; i++) {
            if (this.isRoute()){
                this._tankLocation = this.getForwardLocation();
                this._point++;
                moveValue++;
            }
        }

        this._webGl.moveTank(moveValue);

        const state: State = {
            order: `前ニ${moveValue}マス進め`,
            location: this._tankLocation,
            position: this._tankPosition,
            sendOrder: 5,
            moveValue,
            function: this.goForwardTankWithSquares
        };

        Display.print(state);
        this._states.push(state);
        this.print();
        this.callGoal();
        return Object.assign({}, state);
    }

    goForwardTankToEnd(): State {
        let moveValue = 0;

        while(this.isRoute()) {
            this._tankLocation = this.getForwardLocation();
            this._point++;
            moveValue++;
        }

        this._webGl.moveTank(moveValue);
        
        const state: State = {
            order: "ぶつかるまで前に進め",
            location: this._tankLocation,
            position: this._tankPosition,
            sendOrder: 4,
            moveValue,
            function: this.goForwardTankToEnd
        };

        Display.print(state);
        this._states.push(state);
        this.print();
        this.callGoal();
        return Object.assign({}, state);
    }

    goWhile() {
        const states = Array.from(this._states);

        for (let i = 0; i < 10; i++) {
            states.map(state => {
                if (state.function) {
                    state.function();
                }
            });
        }
    }

    reset() {
        console.log("reset");

        if (this._states.length <= 0) {
            throw "これ以上戻れません";
        }

        const beforState = this._states.pop();
        this._point -= beforState.moveValue;
        Display.delete();

        const beforeState = this._states[this._states.length - 1];

        this._tankLocation = beforeState.location;
        this._tankPosition = beforeState.position;

        this.print();
        this._webGl.reset();
    }

    sendOrder() {
        const HOST = "";
        const PATH = "";
        const sendOrders = this._states.map(state => state.sendOrder);
        console.log(sendOrders);

        let postData = {
            "orders": sendOrders
        };
        
        let postDataStr = JSON.stringify(postData);
        let options = {
            host: HOST,
            port: 80,
            path: PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postDataStr)
            }
        };
        
        const req = http.request(options, (res) => {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log('BODY: ' + chunk);
          });
        });
        req.on('error', (e) => {
          console.log('problem with request: ' + e.message);
        });
        req.write(postDataStr);
        req.end(); 
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

    private callGoal() {
        if (this._tankLocation === this._goalLocation) {
            console.log("Goal!!");
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

    get point(): number {
        // start命令は除外
        return this._point + this._states.length - 1;
    }
}

export default World;