import { Scene, Camera, PerspectiveCamera, Renderer, WebGLRenderer, GridHelper, Vector3, BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import Map from "../Objects/Map";

class WebGL {
    private _scene: Scene;
    private _camera: Camera;
    private _renderer: WebGLRenderer;
    private _cubeSize: number;
    private _cubeBasePosition: Vector3;

    constructor(horizontalNumber: number, width: number, map: Map) {
        // WebGL
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this._renderer = new WebGLRenderer({ antialias: true });

        this._cubeSize = 1000 / (horizontalNumber * 3);
        this._cubeBasePosition = new Vector3(
            (width / 2) / (horizontalNumber * 3) - (width / 2),
            (width / 2) / (horizontalNumber * 3),
            (width / 2) / (horizontalNumber * 3) - (width / 2)
        );

        this.animate = this.animate.bind(this);

        this.init(horizontalNumber);
        this.renderMap(map.getDisplayRoutes(), horizontalNumber);
    }

    private init(horizontalNumber: number) {
        this._renderer.setSize( window.innerWidth, window.innerHeight);
        document.body.appendChild( this._renderer.domElement );

        this._camera.position.set(0, 1500, 0);
        this._camera.lookAt(0, 0, 0);

        // grid
        this._scene.add(new GridHelper(1000, horizontalNumber * 3));
    }

    private renderMap(displayRoutes: boolean[], horizontalNumber: number) {
        // cubes
        const cubeGeo = new BoxGeometry(this._cubeSize, this._cubeSize, this._cubeSize);
        const cubeMaterial = new MeshBasicMaterial({ color: 0x003300 });

        let cubePosition = new Vector3().copy(this._cubeBasePosition);

        for (let i = 0; i < horizontalNumber * 3; i++) {
            for (let j = 0; j < horizontalNumber * 3; j++) {
                if (!(displayRoutes[j + i * horizontalNumber * 3])) {
                    const cube = new Mesh( cubeGeo, cubeMaterial );
                    cube.position.add(cubePosition);
                    this._scene.add( cube );
                }

                cubePosition.x += this._cubeSize;
            }

            cubePosition.z += this._cubeSize;
            cubePosition.x = this._cubeBasePosition.x;
        }

        this.animate();
    }

    private animate() {
        requestAnimationFrame(this.animate);
        this._renderer.render(this._scene, this._camera);
    }
}

export default WebGL;