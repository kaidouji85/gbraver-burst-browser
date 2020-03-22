// @flow

import * as THREE from 'three';
import type {ShockWaveView} from "./shock-wave-view";
import type {Resources} from "../../../../resource";
import {ShockWaveLine} from "./shock-wave-line";
import type {ShockWaveModel} from "../model/shock-wave-model";

/**
 * プレイヤーの衝撃波ビュー
 */
export class PlayerShockWaveView implements ShockWaveView {
  _group: THREE.Group;
  _lines: ShockWaveLine;
  constructor(resources: Resources) {
    this._group = new THREE.Group();

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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveModel): void {
    this._group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  /**
   * 指定したカメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
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