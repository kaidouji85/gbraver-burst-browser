// @flow

import * as THREE from 'three';
import * as R from 'ramda';
import type {ShockWaveView} from "./shock-wave-view";
import type {Resources} from "../../../../resource";
import {ShockWaveLineView} from "./shock-wave-line-view";
import type {ShockWaveLineModel, ShockWaveModel} from "../model/shock-wave-model";
import {SHOCK_WAVE_PARAM} from "../param";

/**
 * プレイヤーの衝撃波ビュー
 */
export class PlayerShockWaveView implements ShockWaveView {
  _group: THREE.Group;
  _lines: ShockWaveLineView[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._lines = R.times(v => new ShockWaveLineView(resources), SHOCK_WAVE_PARAM.MAX_LINES);
    this._lines.forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._lines.forEach(v => {
      v.destructor();
    });
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
    this._group.scale.set(1,1,1);

    if (model.lines.length !== this._lines.length) {
      return;
    }
    model.lines.forEach((lineModel: ShockWaveLineModel, i: number) => {
      const lineView: ShockWaveLineView = this._lines[i];
      const object3D = lineView.getObject3D();
      object3D.position.set(
        lineModel.distance * Math.cos(lineModel.rotate),
        lineModel.distance * Math.sin(lineModel.rotate),
        0
      );
      object3D.rotation.z = lineModel.rotate + Math.PI / 2;
    });
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