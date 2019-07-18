import { Scene, Camera, WebGLRenderer, Mesh } from 'three';

class Renderer {
    scene: Scene;
    camera: Camera;
    renderer: WebGLRenderer;
    cube: Mesh;

    constructor(camera: Camera) {
        this.scene = new Scene();
        this.camera = camera;
        this.renderer = new WebGLRenderer();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.render = this.render.bind(this)
    }

    render() {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}

export default Renderer;