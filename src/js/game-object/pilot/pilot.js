// @flow

import * as THREE from 'three';
import {Animate} from "../../animation/animate";
import type {HUDTracking} from "../../tracking/hud-tracking";

/**
 * パイロット カットイン
 */
export interface Pilot extends HUDTracking {
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
   * カットインを非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate;

  /**
   * シーンに追加するオブジェクトを取得する
   */
  getObject3D(): THREE.Object3D;
}