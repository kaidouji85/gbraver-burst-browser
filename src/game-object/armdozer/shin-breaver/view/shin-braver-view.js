import type {ShinBraverModel} from "../model/shin-braver-model";
import * as THREE from "three";

/** シンブレイバーのビュー */
export interface ShinBraverView {
  /** モデルをビューに反映させる */
  gameLoop(model: ShinBraverModel, camera: THREE.Camera): void;
  /** Sceneに追加するThree.jsオブジェクトを取得する */
  getThreeJsObjects(): THREE.Object3D[];
  /** クリック判定用のメッシュを取得する */
  getClickTarget(): THREE.Mesh[];
}