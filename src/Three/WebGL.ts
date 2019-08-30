import { Scene, Camera, PerspectiveCamera, Renderer, WebGLRenderer, GridHelper, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, UnsignedByteType, PositionalAudioHelper } from "three";
import Map from "../Objects/Map";
import { Position } from "../Enum/Position";
import { posix } from "path";

type event = {
    position: Position,
    moveValue: number,
    counter: number
}

class WebGL {
    private _scene: Scene;
    private _camera: Camera;
    private _renderer: WebGLRenderer;
    private _cubeSize: number;
    private _cubeBasePosition: Vector3;
    private _horizontalNumber: number;
    private _tank: Mesh;
    private _animationEvents: event[];

    constructor(horizontalNumber: number, width: number, map: Map, tankLocation: number, tankPosition: Position) {
        // WebGL
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this._renderer = new WebGLRenderer({ antialias: true });

        this._horizontalNumber = horizontalNumber;
        this._cubeSize = 1000 / (this._horizontalNumber * 3);
        this._cubeBasePosition = new Vector3(
            (width / 2) / (this._horizontalNumber * 3) - (width / 2),
            (width / 2) / (this._horizontalNumber * 3),
            (width / 2) / (this._horizontalNumber * 3) - (width / 2)
        );

        const tankGeo = new BoxGeometry(this._cubeSize/2, this._cubeSize, this._cubeSize/2);
        const tankMaterial = new MeshBasicMaterial({ color: 0xFFFFFF });
        this._tank = new Mesh(tankGeo, tankMaterial);
        this._animationEvents = [];

        this.animate = this.animate.bind(this);

        this.init();
        this.renderMap(map.getDisplayRoutes());
        this.renderTank(tankLocation, tankPosition);
    }

    moveTank(destination: number, tankPosition: Position, tankLocation: number) {
        const destinationY = Math.floor(destination / this._horizontalNumber);
        const destinationX = destination - destinationY * this._horizontalNumber;

        const y = Math.floor(tankLocation / this._horizontalNumber);
        const x = tankLocation - y * this._horizontalNumber;

        switch(tankPosition){
            case Position.Top:
            case Position.Bottom:
                this._animationEvents.push({
                    position: tankPosition,
                    moveValue: destinationY - y,
                    counter: 60
                });
                break;
            case Position.Right:
            case Position.Left:
                this._animationEvents.push({
                    position: tankPosition,
                    moveValue: destinationX - x,
                    counter: 60
                });
                break;
        }
    }

    private init() {
        this._renderer.setSize( window.innerWidth, window.innerHeight);
        document.body.appendChild( this._renderer.domElement );

        this._camera.position.set(0, 1800, 0);
        this._camera.lookAt(0, 0, 0);

        // grid
        this._scene.add(new GridHelper(1000, this._horizontalNumber * 3));

        this.animate();
    }

    private renderTank(tankLocation: number, tankPosition: Position) {
        const displayLocation = this.getDisplayLocation(tankLocation);
        const z = Math.floor(displayLocation / (this._horizontalNumber * 3));
        const x = displayLocation - z * this._horizontalNumber * 3;

        console.log(z, this._horizontalNumber);

        let displayTankLocation = new Vector3().copy(this._cubeBasePosition);
        displayTankLocation.x += this._cubeSize * x;
        displayTankLocation.z += this._cubeSize * z;

        this._tank.position.add(displayTankLocation);
        this._scene.add(this._tank);
    }

    // 描画上のタンクの位置
    private getDisplayLocation(tankLocation: number) {
        const y = Math.floor(tankLocation / this._horizontalNumber);
        const x = tankLocation - y * this._horizontalNumber;
        return (1 + 3 * y) * this._horizontalNumber * 3 + (1 + 3 * x);
    }

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

    private animate() {
        requestAnimationFrame(this.animate);

        // update
        let event = this._animationEvents.shift();

        if (event) {
            console.log(event.counter);

            switch(event.position) {
                case Position.Top:
                case Position.Bottom:
                    this._tank.translateZ((event.moveValue * this._cubeSize * 3) / 60);
                    break;
                case Position.Right:
                case Position.Left:
                    this._tank.translateX((event.moveValue * this._cubeSize * 3) / 60);
            }

            event.counter -= 1;

            if (event.counter > 0) {
                this._animationEvents.unshift(event);   
            }
        }

        this._renderer.render(this._scene, this._camera);
    }
}

export default WebGL;