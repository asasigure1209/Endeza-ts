import Renderer from './Three/Renderer'
import Voxel from './Three/Voxel'
import { PerspectiveCamera, Scene, Color } from 'three';

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 1500, 0)
camera.lookAt(0, 0, 0);

const scene = new Scene();
scene.background = new Color(0xf0f0f0);

const renderer: Renderer = new Renderer(camera, scene);
const voxel = new Voxel(50, 20);

renderer.addObjects(...voxel.rendererObjects);
renderer.render();