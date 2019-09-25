import { Scene, Camera, PerspectiveCamera, WebGLRenderer, GridHelper, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, UnsignedByteType, PositionalAudioHelper, Euler } from "three";
import Map from "../Objects/Map";
import { Position } from "../Enum/Position";

type event = {
    reset?: boolean,
    moveValue?: number,
    turnRight?: boolean,
    turnLeft?: boolean,
    counter?: number
}

type state = {
    location: Vector3,
    rotation: Euler
}

// GUI表示用
class WebGL {
    private _scene: Scene;
    private _camera: Camera;
    private _renderer: WebGLRenderer;
    private _cubeSize: number;
    private _cubeBasePosition: Vector3;
    private _horizontalNumber: number;
    private _tank: Mesh;
    private _animationEvents: event[];
    private _animationSpeed: number;
    private _state: state[];

    constructor(horizontalNumber: number, width: number, map: Map, tankLocation: number, tankPosition: Position, goalLocation: number) {
        // WebGL
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(45, 1, 1, 10000);
        this._renderer = new WebGLRenderer({ antialias: true });

        this._horizontalNumber = horizontalNumber;
        this._cubeSize = 1000 / (this._horizontalNumber * 3);
        this._cubeBasePosition = new Vector3(
            (width / 2) / (this._horizontalNumber * 3) - (width / 2),
            (width / 2) / (this._horizontalNumber * 3),
            (width / 2) / (this._horizontalNumber * 3) - (width / 2)
        );

        const tankGeo = new BoxGeometry(this._cubeSize/2, this._cubeSize, this._cubeSize/4);
        const tankMaterial = new MeshBasicMaterial({ color: 0xFFFFFF });
        this._tank = new Mesh(tankGeo, tankMaterial);
        this._animationEvents = [];
        this._animationSpeed = 60;
        this._state = [];

        this.animate = this.animate.bind(this);

        this.init();
        this.renderMap(map.getDisplayRoutes());
        this.renderTank(tankLocation, tankPosition);
        this.renderGoal(goalLocation);
    }

    // タンクを指定された分前方向に動かす
    moveTank(moveValue: number) {
        this._animationEvents.push({
            moveValue: moveValue,
            counter: this._animationSpeed
        });
    }

    // タンク右回転
    turnRight() {
        this._animationEvents.push({
            turnRight: true,
            counter: this._animationSpeed
        });
    }

    // タンク左回転
    turnLeft() {
        this._animationEvents.push({
            turnLeft: true,
            counter: this._animationSpeed
        });
    }

    // 直前の命令を取り消す
    reset() {
        this._animationEvents.push({
            reset: true
        })
    }

    private init() {
        this._renderer.setSize( window.innerWidth / 2, window.innerWidth / 2 - 20);
        const canvas = document.querySelector("div.canvas");
        canvas.appendChild( this._renderer.domElement );

        this._camera.position.set(0, 1800, 400);
        this._camera.lookAt(0, 0, 0);

        // grid
        this._scene.add(new GridHelper(1000, this._horizontalNumber * 3));

        this.animate();
    }

    // タンクの描画
    public renderTank(tankLocation: number, tankPosition: Position) {
        this._tank.position.set(0, 0, 0);
        this._tank.rotation.set(0, 0, 0);

        // 一つ一つのオブジェクトの位置関係
        const displayLocation = this.getDisplayLocation(tankLocation);


        const z = Math.floor(displayLocation / (this._horizontalNumber * 3));
        const x = displayLocation - z * this._horizontalNumber * 3;

        console.log(`x: ${x} z: ${z}`);

        let displayTankLocation = this._cubeBasePosition.clone();
        console.log(this._cubeBasePosition);
        console.log(displayTankLocation);
        displayTankLocation.x += this._cubeSize * x;
        displayTankLocation.z += this._cubeSize * z;

        switch(tankPosition) {
            case Position.Top:
                this._tank.rotateY(Math.PI/2);
                break;
            case Position.Bottom:
                this._tank.rotateY(-Math.PI/2);
                break;
            case Position.Left:
                this._tank.rotateY(Math.PI);
        }

        this._tank.position.add(displayTankLocation);

        this._scene.add(this._tank);
    }

    // 描画上のタンクの位置
    private getDisplayLocation(tankLocation: number) {
        const y = Math.floor(tankLocation / this._horizontalNumber);
        const x = tankLocation - y * this._horizontalNumber;
        return (1 + 3 * y) * this._horizontalNumber * 3 + (1 + 3 * x);
    }

    //　Mapの生成
    private renderMap(displayRoutes: boolean[]) {
        // cubes
        const cubeGeo = new BoxGeometry(this._cubeSize, this._cubeSize, this._cubeSize);
        const cubeMaterial = new MeshBasicMaterial({ color: 0x003300 });

        let cubeLocation = new Vector3().copy(this._cubeBasePosition);

        for (let i = 0; i < this._horizontalNumber * 3; i++) {
            for (let j = 0; j < this._horizontalNumber * 3; j++) {
                if (!(displayRoutes[j + i * this._horizontalNumber * 3])) {
                    const cube = new Mesh(cubeGeo, cubeMaterial);
                    cube.position.add(cubeLocation);
                    this._scene.add(cube);
                }

                cubeLocation.x += this._cubeSize;
            }

            cubeLocation.z += this._cubeSize;
            cubeLocation.x = this._cubeBasePosition.x;
        }
    }

    // ゴール目印を描画
    private renderGoal(goalLocation: number) {
        const goalGeo = new BoxGeometry(this._cubeSize, this._cubeSize, this._cubeSize)
        const goalMaterial = new MeshBasicMaterial({ color: 0xFF0000 });
        const goal = new Mesh(goalGeo, goalMaterial);

        const displayLocation = this.getDisplayLocation(goalLocation);
        const z = Math.floor(displayLocation / (this._horizontalNumber * 3));
        const x = displayLocation - z * this._horizontalNumber * 3;

        let displayGoalLocation = new Vector3().copy(this._cubeBasePosition);
        displayGoalLocation.x += this._cubeSize * x;
        displayGoalLocation.z += this._cubeSize * z;

        goal.position.add(displayGoalLocation);

        this._scene.add(goal);
    }

    // アニメーション(標準:60fps)
    private animate() {
        requestAnimationFrame(this.animate);

        // update
        let event = this._animationEvents.shift();

        if (event) {
            // 前に戻る
            if (event.reset) {
                const beforeState = this._state.pop();
                this._tank.position.set(beforeState.location.x, beforeState.location.y, beforeState.location.z);
                this._tank.rotation.set(this._tank.rotation.x, beforeState.rotation.y, this._tank.rotation.z);
            } else {
                // 前のタンクの状態を保存
                if (event.counter === this._animationSpeed) {
                    this._state.push({
                        location: this._tank.position.clone(),
                        rotation: this._tank.rotation.clone()
                    });
                }

                // 移動
                if (event.moveValue) {
                    this._tank.translateX((event.moveValue * this._cubeSize * 3) / this._animationSpeed);
                }

                // 回転
                if (event.turnRight) {
                    this._tank.rotateY((-Math.PI/2) / this._animationSpeed);
                } else if (event.turnLeft) {
                    this._tank.rotateY((Math.PI/2) / this._animationSpeed);
                }

                event.counter -= 1;

                // 終了
                if (event.counter > 0) {
                    this._animationEvents.unshift(event);   
                }
            }
        }

        this._renderer.render(this._scene, this._camera);
    }
}

export default WebGL;