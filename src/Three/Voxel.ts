import { BoxBufferGeometry, MeshBasicMaterial, Mesh, Object3D, MeshLambertMaterial, TextureLoader, GridHelper, PlaneBufferGeometry } from "three";

class Voxel {
    objects: Object3D[];

    constructor(voxelSize: number, horizontalNumber: number) {
        const width = voxelSize * horizontalNumber;
        this.objects = new Array<Object3D>();

        // roll-over helpers
        const rollOverGeo = new BoxBufferGeometry(voxelSize, voxelSize, voxelSize);
        const rollOverMaterial = new MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true});
        const rollOverMesh = new Mesh(rollOverGeo, rollOverMaterial);
        this.objects.push(rollOverMesh);

        // cubes
        const cubeGeo = new BoxBufferGeometry(voxelSize, voxelSize, voxelSize);
        const cubeMaterial = new MeshLambertMaterial({ color: 0xfeb74c, map: new TextureLoader().load('textures/square-outline-textured.png')});

        // grid
        const gridHelper = new GridHelper(width, horizontalNumber);
        this.objects.push(gridHelper);

        // plane
        const geometory = new PlaneBufferGeometry(width, width);
        geometory.rotateX(-Math.PI / 2);
        const plane = new Mesh(geometory, new MeshBasicMaterial({ visible: false }));
        this.objects.push(plane);
    }

    get rendererObjects(): Object3D[] {
        return this.objects
    }
}

export default Voxel;