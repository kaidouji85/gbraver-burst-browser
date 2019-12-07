// @flow

import * as THREE from 'three';
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {Battery} from "../model/gauge-model";

export const MAX_BATTERY = 5;

/** プレイヤーバッテリー */
export class PlayerBatteryGauge {
  _group: THREE.Group;
  _gaugeList: BatteryGaugeUnit[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._gaugeList = R.times(v => v + 1, MAX_BATTERY)
      .map(v => new BatteryGaugeUnit(resources, v));
    this._gaugeList.forEach((gauge, index) => {
      gauge.getObject3D().position.x = index * 95;
      this._group.add(gauge.getObject3D());
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._gaugeList.forEach(v => {
      v.destructor();
    });
  }

  /**
   * バッテリーゲージモデルを反映させる
   *
   * @param batteryList モデル
   */
  engage(batteryList: Battery[]): void {
    batteryList.forEach(v => {
      const gauge = this._gaugeList.find(gauge => gauge.getValue() === v.value);
      if (!gauge) {
        return;
      }
      gauge.setOpacity(v.opacity);
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

class BatteryGaugeUnit {
  _group: THREE.Group;
  _gauge: SimpleImageMesh;
  _value: number;

  constructor(resources: Resources, value: number) {
    this._group = new THREE.Group();

    this._value = value;

    const gaugeResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE);
    const gaugeImage = gaugeResource
      ? gaugeResource.image
      : new Image();
    this._gauge = new SimpleImageMesh({
      image: gaugeImage,
      canvasSize: 128
    });
    this._group.add(this._gauge.getObject3D());
  }

  destructor() {
    this._gauge.destructor();
  }

  getObject3D(): THREE.Object3D {
    return this._group;
  }

  getValue(): number {
    return this._value;
  }

  setOpacity(opacity: number): void {
    this._gauge.setOpacity(opacity);
  }
}