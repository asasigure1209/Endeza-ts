import Tile, { RoutesTemplate } from "./Objects/Tile";
import Map from "./Objects/Map";
import World from "./Objects/World";
import { Position } from "./Enum/Position";
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, GridHelper, BoxBufferGeometry, Vector3 } from "three";

/* VTank内部 */

// 利用するTile(4x4)
const tiles = [
    new Tile(RoutesTemplate.upperLeft),
    new Tile(RoutesTemplate.upper),
    new Tile(RoutesTemplate.upperRight),
    new Tile(RoutesTemplate.left),
    new Tile(RoutesTemplate.center),
    new Tile(RoutesTemplate.right),
    new Tile(RoutesTemplate.lowerLeft),
    new Tile(RoutesTemplate.lower),
    new Tile(RoutesTemplate.lowerRight)
];

// Mapの生成
const map = new Map(3, 3, tiles);
const world = new World(map, 3, Position.Bottom);

// WebGLでのMapの生成
const scene = new Scene();
const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);

const renderer = new WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set( 0, 1500, 0 );
camera.lookAt( 0, 0, 0 );

// grid
const gridHelper = new GridHelper( 1000, 3 * 3 );
scene.add(gridHelper);

// size
const cubeSize = 1000 / (3 * 3);
const cubeBasePosition = new Vector3( -500 + 500/(3*3), 500/(3*3), -500 + 500/(3*3) );

// cubes
const cubeGeo = new BoxGeometry( cubeSize, cubeSize, cubeSize );
const cubeMaterial = new MeshBasicMaterial( {color: 0xFFFFFF } );

// Map Renderer
const displayRoutes = map.getDisplayRoutes();
let cubePosition = new Vector3().copy(cubeBasePosition);

for (let i = 0; i < map.horizontalNumber * 3; i++) {
    for (let j = 0; j < map.verticalNumber * 3; j++) {
        if (displayRoutes[j + i * map.horizontalNumber * 3]) {
            cubePosition.x += cubeSize;
        } else {
            const cube = new Mesh( cubeGeo, cubeMaterial );
            cube.position.add(cubePosition);
            scene.add( cube );
            cubePosition.x += cubeSize;
        }
    }

    cubePosition.z += cubeSize;
    cubePosition.x = cubeBasePosition.x;
}


animate();

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}