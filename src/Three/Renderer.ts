import { Scene, Camera, WebGLRenderer, Mesh, Object3D } from 'three';

class Renderer {
    scene: Scene;
    camera: Camera;
    renderer: WebGLRenderer;
    cube: Mesh;

    constructor(camera: Camera, scene: Scene) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = new WebGLRenderer();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.render = this.render.bind(this)
    }

    addObjects(...objects: Object3D[]) {
        this.scene.add(...objects)
    }

    render() {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}

export default Renderer;