import Tile from "./Tile";

type SortedTilesByLocation = {
    top: Tile[],
    left: Tile[],
    bottom: Tile[],
    right: Tile[],
}

class Map {
    private _verticalNumber: number;
    private _horizontalNumber: number;
    private _tiles: Tile[];

    constructor(verticalNumber: number, horizontalNumber: number, tiles: Tile[]) {
        if (this.hasCorrectNumberTiles(verticalNumber * horizontalNumber, tiles) && this._isCorrectMap(tiles, verticalNumber, horizontalNumber)) {
            this._verticalNumber = verticalNumber;
            this._horizontalNumber = horizontalNumber;
            this._tiles = tiles;
        } else {
            throw "Tileに不備があります"
        }
    }

    // タイルの数があっているか
    private hasCorrectNumberTiles(tilesNumber: number, tiles: Tile[]) {
        if (tilesNumber === tiles.length) {
            return true;
        }

        return false;
    }

    // タイルがそれぞれ正しい組み合わせか
    private _isCorrectMap(tiles: Tile[], verticalNumber: number, horizontalNumber: number) {
        const sortedTilesByLocation = this.getSortedTilesByLocation(tiles, verticalNumber, horizontalNumber);

        // 左端のタイルが左に行ける
        const hasLeft = sortedTilesByLocation.left.some((tile) => {
            return tile.routes.left;
        });
        const hasTop = sortedTilesByLocation.top.some((tile) => {
            return tile.routes.top
        })
        // 右端のタイルの右に行けるか
        const hasRight = sortedTilesByLocation.right.some((tile) => {
            return tile.routes.right;
        });
        // 下端のタイルの下に行けるか
        const hasBottom = sortedTilesByLocation.bottom.some((tile) => {
            return tile.routes.bottom;
        });

        // タイルの道がMap外
        if (hasLeft || hasBottom || hasRight || hasTop) {
            return false;
        }

        // タイルの道がつながらない場所にあるか
        const hasWrongRoute = tiles.some((tile, index) => {
            if (tile.routes.top) {
                return !(tiles[index - horizontalNumber].routes.bottom);
            }

            if (tile.routes.right) {
                return !(tiles[index + 1].routes.left);
            }

            if (tile.routes.bottom) {
                return !(tiles[index + horizontalNumber].routes.top);
            }

            if (tile.routes.left) {
                return !(tiles[index - 1].routes.right);
            }
        });

        return !hasWrongRoute;
    }

    private getSortedTilesByLocation(tiles: Tile[], verticalNumber: number, horizontalNumber: number): SortedTilesByLocation {
        // 左端のタイル
        const leftTiles = tiles.filter((tile, index) => {
            return index % horizontalNumber === 0;
        });
        // 上端のタイル
        const topTiles = tiles.filter((tiles, index) => {
            return index < horizontalNumber;
        });
        // 右端のタイル
        const rightTiles = tiles.filter((tile, index) => {
            return index % horizontalNumber === horizontalNumber -1;
        });
        // 下端のタイル
        const bottomTiles = tiles.filter((tile, index) => {
            return verticalNumber * horizontalNumber - horizontalNumber <= index;
        });

        return {
            left: leftTiles,
            top: topTiles,
            right: rightTiles,
            bottom: bottomTiles
        }
    }

    get verticalNumber() {
        return this._verticalNumber;
    }

    get horizontalNumber() {
        return this._horizontalNumber;
    }

    get tiles() {
        return Array.from(this._tiles);
    }
}

export default Map;