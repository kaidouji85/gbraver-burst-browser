// @flow

import * as THREE from 'three';
import {AttackerIndicator} from "../attacker-indicator";

/** アタッカーインジケータービュー */
export interface AttackerIndicatorView {
  /** モデルをビューに反映させる */
  engage(model: AttackerIndicator): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}