// @flow

import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";
import type {BatteryNumberModel} from "../model/battery-number-model";
import type {BatteryNumberView} from "./battery-number-view";

export const MESH_SIZE = 100;
export const MAX_BATTERY_ANIMATION = 16;
export const MAX_BATTERY_VALUE = 9;

/** プレイヤーのバッテリー数字ビュー */
export class PlayerBatteryNumberView implements BatteryNumberView {
  #numberMesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const batteryNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER);
    const batteryNumber = batteryNumberResource
      ? batteryNumberResource.texture
      : new THREE.Texture();
    this.#numberMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#numberMesh.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BatteryNumberModel): void {
    const battery = Math.min(model.battery, MAX_BATTERY_VALUE) / MAX_BATTERY_ANIMATION;
    this.#numberMesh.animate(battery);

    this.#numberMesh.setOpacity(model.opacity);

    this.#numberMesh.getObject3D().position.x = ARMDOZER_EFFECT_STANDARD_X;
    this.#numberMesh.getObject3D().position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this.#numberMesh.getObject3D().position.z = ARMDOZER_EFFECT_STANDARD_Z;

    this.#numberMesh.getObject3D().scale.set(model.scale, model.scale, model.scale);
  }

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this.#numberMesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this.#numberMesh.getObject3D();
  }
}
