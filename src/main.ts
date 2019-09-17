import Tile, { RoutesTemplate } from "./Objects/Tile";
import Map from "./Objects/Map";
import World from "./Three/World";
import { Position } from "./Enum/Position";

/* VTank内部 */

// 利用するTile(4x4)
const tiles = [
    new Tile(RoutesTemplate.upperLeft),
    new Tile(RoutesTemplate.horizontal),
    new Tile(RoutesTemplate.upper),
    new Tile(RoutesTemplate.onlyLeft),
    new Tile(RoutesTemplate.lowerLeft),
    new Tile(RoutesTemplate.upperRight),
    new Tile(RoutesTemplate.lowerLeft),
    new Tile(RoutesTemplate.upperRight),
    new Tile(RoutesTemplate.upperLeft),
    new Tile(RoutesTemplate.lowerRight),
    new Tile(RoutesTemplate.upperLeft),
    new Tile(RoutesTemplate.lowerRight),
    new Tile(RoutesTemplate.lowerLeft),
    new Tile(RoutesTemplate.horizontal),
    new Tile(RoutesTemplate.lower),
    new Tile(RoutesTemplate.onlyLeft)
];

// Mapの生成
const map = new Map(4, 4, tiles);
const world = new World(map, 0, Position.Bottom, 15);