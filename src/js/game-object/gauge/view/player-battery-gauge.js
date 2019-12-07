// @flow

import * as THREE from 'three';
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

export const MAX_BATTERY = 5;

type Gauge = {
  mesh: SimpleImageMesh,
  battery: number,
};

/** プレイヤーバッテリー */
export class PlayerBatteryGauge {
  _group: THREE.Group;
  _gaugeList: Gauge[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const gaugeResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE);
    const gauge = gaugeResource
      ? gaugeResource.image
      : new Image();
    this._gaugeList = R.times(v => {
      const mesh = new SimpleImageMesh({
        canvasSize: 128,
        image: gauge,
      });
      mesh.getObject3D().position.x = 95 * v;

      const battery = v + 1;

      return {mesh: mesh, battery: battery};
    }, MAX_BATTERY);
    this._gaugeList.forEach(v => {
      this._group.add(v.mesh.getObject3D());
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._gaugeList.forEach(v => {
      v.mesh.destructor();
    });
  }

  /**
   * バッテリーゲージの値を設定する
   *
   * @param value 設定値
   */
  setValue(value: number): void {
    this._gaugeList.forEach((v, index) => {
      const opacity = v.battery <= value
        ? 1
        : 0;
      v.mesh.setOpacity(opacity);
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}