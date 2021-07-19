// @flow

import type {BatteryCorrectView} from "./battery-correct-view";
import type {Resources} from "../../../resource";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import * as THREE from "three";
import type {BatteryCorrectModel} from "../model/battery-correct-model";

export const MESH_SIZE = 100;
export const MAX_BATTERY_ANIMATION = 16;
//export const MAX_BATTERY_VALUE = 9;

/** プレイヤー側 バッテリー補正ビュー */
export class PlayerBatteryCorrectView implements BatteryCorrectView {
  _numberMesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソースか管理オブジェクト
   */
  constructor(resources: Resources) {
    const batteryNumber = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER)
      ?.texture ?? new THREE.Texture();
    this._numberMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** @override */
  destructor(): void {
    this._numberMesh.destructor();
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this._numberMesh.getObject3D();
  }

  /** @override */
  engage(model: BatteryCorrectModel): void {
    const frame = model.correctValue / MAX_BATTERY_ANIMATION;
    this._numberMesh.animate(frame);
  }
}