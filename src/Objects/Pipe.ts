import Map from "./Map";
import World from "./World";

class Pipe {
    private _world: World;
    
    constructor(world: World) {
        this._world = world;

        this.goForwardTank = this.goForwardTank.bind(this);
        this.goWallForwardTank = this.goWallForwardTank.bind(this);
    }

    goForwardTank() {
        try {
            const state = this._world.goForwardTank();

            //描画
        }
        catch {
            console.log("前に進めない!")
        }
    }

    goWallForwardTank() {
        try {
            while(1) {
                const state = this._world.goForwardTank()
                console.log(state)

                //描画
            }
        }
        catch {
            console.log('ぶつかった');
        }
    }
}

export default Pipe;