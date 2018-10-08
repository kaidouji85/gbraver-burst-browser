import type {NeoLandozerModel} from "../model/neo-landozer-model";
import * as THREE from "three";

/** ネオランドーザのビュー */
export interface NeoLandozerView {
  /** モデルをビューに反映させる */
  engage(model: NeoLandozerModel, camera: THREE.Camera): void;
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}