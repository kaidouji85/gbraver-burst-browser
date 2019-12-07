// @flow

import * as THREE from 'three';
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

export const MAX_BATTERY = 5;
export const MIN_BATTERY = 0;

/** プレイヤーバッテリー */
export class PlayerBatteryGauge {
  _group: THREE.Group;
  _meshList: SimpleImageMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const gaugeResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE);
    const gauge = gaugeResource
      ? gaugeResource.image
      : new Image();
    this._meshList = R.times(v => {
      const mesh = new SimpleImageMesh({
        canvasSize: 128,
        image: gauge,
      });
      mesh.getObject3D().position.x = 95 * v;
      return mesh;
    }, MAX_BATTERY);
    this._meshList.forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /**
   * バッテリーゲージの値を設定する
   *
   * @param value 設定値
   */
  setValue(value: number): void {
    const correctValue = this._correctValue(value);
    this._meshList.forEach((v, index) => {
      const value = index + 1;
      const isVisible = value <= correctValue;
      const opacity = isVisible ? 1 : 0;
      v.setOpacity(opacity);
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

  _correctValue(value: number): number {
    if (value < MIN_BATTERY) {
      return MIN_BATTERY;
    } else if (MAX_BATTERY < value) {
      return MAX_BATTERY;
    } else {
      return Math.floor(value);
    }
  }
}