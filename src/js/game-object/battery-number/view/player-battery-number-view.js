// @flow

import type {BatteryNumberView} from "./battery-number-view";
import type {BatteryNumberModel} from "../model/battery-number-model";
import type {Resources} from "../../../resource";
import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";

export const MESH_SIZE = 100;
export const MAX_BATTERY_ANIMATION = 16;
export const MAX_BATTERY_VALUE = 9;

/** プレイヤーのバッテリー数字ビュー */
export class PlayerBatteryNumberView implements BatteryNumberView {
  _numberMesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const batteryNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER);
    const batteryNumber = batteryNumberResource
      ? batteryNumberResource.texture
      : new THREE.Texture();
    this._numberMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._numberMesh.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BatteryNumberModel): void {
    const battery = Math.min(model.battery, MAX_BATTERY_VALUE) / MAX_BATTERY_ANIMATION;
    this._numberMesh.animate(battery);

    this._numberMesh.setOpacity(model.opacity);

    this._numberMesh.getObject3D().position.x = ARMDOZER_EFFECT_STANDARD_X;
    this._numberMesh.getObject3D().position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this._numberMesh.getObject3D().position.z = ARMDOZER_EFFECT_STANDARD_Z;

    this._numberMesh.getObject3D().scale.set(model.scale, model.scale, model.scale);
  }

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this._numberMesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._numberMesh.getObject3D();
  }
}
