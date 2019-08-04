import Renderer from './Three/Renderer'
import Voxel from './Three/Voxel'
import { PerspectiveCamera, Scene, Color, TrianglesDrawMode } from 'three';
import Tile, { RoutesTemplate } from './Objects/Tile';
import Map from './Objects/Map';
import World from './Objects/World';
import { Position } from './Enum/Position';
import Pipe from './Objects/Pipe';


/* WebGL */
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 1500, 0)
camera.lookAt(0, 0, 0);

const scene = new Scene();
scene.background = new Color(0xf0f0f0);

const renderer: Renderer = new Renderer(camera, scene);
const voxel = new Voxel(50, 20);

renderer.addObjects(...voxel.rendererObjects);
renderer.render();


/* VTank */
const tiles = [
    new Tile(RoutesTemplate.upperLeft),
    new Tile(RoutesTemplate.upper),
    new Tile(RoutesTemplate.upper),
    new Tile(RoutesTemplate.upperRight),
    new Tile(RoutesTemplate.left),
    new Tile(RoutesTemplate.center),
    new Tile(RoutesTemplate.center),
    new Tile(RoutesTemplate.right),
    new Tile(RoutesTemplate.left),
    new Tile(RoutesTemplate.center),
    new Tile(RoutesTemplate.center),
    new Tile(RoutesTemplate.right),
    new Tile(RoutesTemplate.lowerLeft),
    new Tile(RoutesTemplate.lower),
    new Tile(RoutesTemplate.lower),
    new Tile(RoutesTemplate.lowerRight)
];

const map = new Map(4, 4, tiles);
const world = new World(map, 12, Position.Top)
const pipe = new Pipe(world);


/* DOM */
const body = document.querySelector('body');

const button1 = document.createElement('button');
button1.textContent = "前へ進む";
button1.onclick = pipe.goForwardTank;

const button2 = document.createElement('button');
button2.textContent = "ぶつかるまで前に進む";
button2.onclick = pipe.goWallForwardTank;

body.appendChild(button1);
body.appendChild(button2);