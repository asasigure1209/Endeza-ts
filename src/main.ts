import Tile, { RoutesTemplate } from "./Objects/Tile";
import Map from "./Objects/Map";
import World from "./Three/World";
import { Position } from "./Enum/Position";
import * as http from 'http';

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


const server = http.createServer();

server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.method == 'POST') {
        let postData = '';

        request.on('data', (chunk) => {
            postData += chunk;
            
            if (postData === "goForwardTank") {
                world.goForwardTank();
            } else if (postData === "turnRightTank") {
                world.turnRightTank();
            } else if (postData === "turnLeftTank") {
                world.turnLeftTank();
            } else if (postData === "goForwardTankToEnd"){ 
                world.goForwardTankToEnd();
            } else if (postData === "reset") {
                world.reset();
            }
        }).on('end', () => {
            response.end('送信したのは' + postData);
        })
    }
})

server.listen(8080);
console.log(`Server running at ${server.address}`);