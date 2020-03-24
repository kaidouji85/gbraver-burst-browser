// @flow

import * as THREE from 'three';
import * as R from 'ramda';
import type {ShockWaveView} from "./shock-wave-view";
import type {Resources} from "../../../../resource";
import {ShockWaveLineView} from "./shock-wave-line-view";
import type {ShockWaveLineModel, ShockWaveModel} from "../model/shock-wave-model";
import {ShockWaveRingView} from "./shock-wave-ring-view";

/**
 * プレイヤーの衝撃波ビュー
 */
export class PlayerShockWaveView implements ShockWaveView {
  _group: THREE.Group;
  _lines: ShockWaveLineView[];
  _ring: ShockWaveRingView;

  constructor(resources: Resources, initialModel: ShockWaveModel) {
    const maxLines = initialModel.lines.length;
    this._group = new THREE.Group();

    this._lines = R.times(v => new ShockWaveLineView(resources), maxLines);
    this._lines.forEach(v => {
      this._group.add(v.getObject3D());
    });

    this._ring = new ShockWaveRingView(resources);
    this._group.add(this._ring.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._lines.forEach(v => {
      v.destructor();
    });
    this._ring.destructor();
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

    this._ring.engage(model.ring);

    if (model.lines.length !== this._lines.length) {
      return;
    }
    model.lines.forEach((lineModel: ShockWaveLineModel, i: number) => {
      const lineView: ShockWaveLineView = this._lines[i];
      lineView.engage(lineModel);
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