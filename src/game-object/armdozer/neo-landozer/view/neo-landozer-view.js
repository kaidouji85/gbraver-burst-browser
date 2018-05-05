import type {NeoLandozerModel} from "../model/neo-landozer-model";
import * as THREE from "three";

/** ネオランドーザのビュー */
export interface NeoLandozerView {
  /** モデルをビューに反映させる */
  gameLoop(model: NeoLandozerModel, camera: THREE.Camera): void;
  /** Sceneに追加するThree.jsオブジェクトを取得する */
  getThreeJsObjects(): THREE.Object3D[];
}