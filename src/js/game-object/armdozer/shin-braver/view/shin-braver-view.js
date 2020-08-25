// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import * as THREE from "three";

/** シンブレイバーのビュー */
export interface ShinBraverView {
  /** デストラクタ */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel): void;

  /** カメラの真正面を向く */
  lookAt(camera: typeof THREE.Camera): void;

  /** Sceneに追加するThree.jsオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D;

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object 追加するオブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void;
}