import type {ShinBraverModel} from "../model/shin-braver-model";
import * as THREE from "three";

/** シンブレイバーのビュー */
export interface ShinBraverView {
  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel, camera: THREE.Camera): void;
  /** Sceneに追加するThree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}