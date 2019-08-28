import Tile, { RoutesTemplate } from "./Objects/Tile";
import Map from "./Objects/Map";
import World from "./Three/World";
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