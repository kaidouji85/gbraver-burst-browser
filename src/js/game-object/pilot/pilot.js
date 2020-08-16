// @flow

import * as THREE from 'three';
import {Animate} from "../../animation/animate";

/**
 * パイロット カットイン
 */
export interface Pilot {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate;

  /**
   * シーンに追加するオブジェクトを取得する
   */
  getObject3D(): THREE.Object3D;
}