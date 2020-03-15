// @flow

import {Animate} from "../../animation/animate";
import * as THREE from 'three';

/**
 * カットインアニメーション
 */
export interface CutIn {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}