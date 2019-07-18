import Renderer from './Three/Renderer'
import { PerspectiveCamera } from 'three';

const renderer: Renderer = new Renderer(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
renderer.render();