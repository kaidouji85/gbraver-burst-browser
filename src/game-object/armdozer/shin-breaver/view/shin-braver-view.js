import type {ShinBraverModel} from "../model/shin-braver-model";
import * as THREE from "three";

/** シンブレイバーのビュー */
export interface ShinBraverView {
  gameLoop(model: ShinBraverModel, camera: THREE.Camera): void;

  getThreeJsObjects(): THREE.Object3D[];
}