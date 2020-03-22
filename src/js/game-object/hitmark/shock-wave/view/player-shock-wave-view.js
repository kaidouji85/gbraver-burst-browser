// @flow

import * as THREE from 'three';
import type {ShockWaveView} from "./shock-wave-view";
import type {Resources} from "../../../../resource";
import {ShockWaveLine} from "./shock-wave-line";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../armdozer/position";

/**
 * プレイヤーの衝撃波ビュー
 */
export class PlayerShockWaveView implements ShockWaveView {
  _group: THREE.Group;
  _lines: ShockWaveLine;
  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._group.position.set(
      ARMDOZER_EFFECT_STANDARD_X,
      ARMDOZER_EFFECT_STANDARD_Y,
      ARMDOZER_EFFECT_STANDARD_Z
    );

    this._lines = new ShockWaveLine(resources);
    this._group.add(this._lines.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._lines.destructor();
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D() {
    return this._group;
  }
}