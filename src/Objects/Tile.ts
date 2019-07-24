export type Routes = {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean
}

export const RoutesTemplate = {
    lowerLeft: {
        top: true,
        right: true,
        bottom: false,
        left: false
    },
    lowerRight: {
        top: true,
        right: false,
        bottom: false,
        left: true
    },
    upperLeft: {
        top: false,
        right: true,
        bottom: true,
        left: false
    },
    upperRight: {
        top: false,
        right: false,
        bottom: true,
        left: true
    },
    center: {
        top: true,
        right: true,
        bottom: true,
        left: true
    },
    lower: {
        top: true,
        right: true,
        bottom: false,
        left: true
    },
    upper: {
        top: false,
        right: true,
        bottom: true,
        left: true
    },
    left: {
        top: true,
        right: true,
        bottom: true,
        left: false
    },
    right: {
        top: true,
        right: false,
        bottom: true,
        left: true
    }
};

class Tile {
    private _routes: Routes;

    constructor(positions: Routes) {
        this._routes = positions;
    }

    get routes() {
        return Object.assign({}, this._routes);
    }
}

export default Tile;