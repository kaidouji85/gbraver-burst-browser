// @flow

import type {BatteryNumberView} from "./battery-number-view";
import type {BatteryNumberModel} from "../model/battery-number-model";
import type {Resources} from "../../../resource";
import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";

export const MESH_SIZE = 100;
export const MAX_BATTERY_ANIMATION = 16;
export const MAX_BATTERY_VALUE = 9;

/** プレイヤーのバッテリー数字ビュー */
export class PlayerBatteryNumberView implements BatteryNumberView {
  _numberMesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const batteryNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER);
    const batteryNumber: THREE.Texture = batteryNumberResource ? batteryNumberResource.texture : new THREE.Texture();
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

  /** モデルをビューに反映させる */
  engage(model: BatteryNumberModel): void {
    this._refreshBatteryNumber(model);
    this._refreshPos();
    this._refreshOpacity(model);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._numberMesh.getObject3D().quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._numberMesh.getObject3D();
  }

  /** バッテリー値を更新する */
  _refreshBatteryNumber(model: BatteryNumberModel): void {
    const battery = Math.min(model.battery, MAX_BATTERY_VALUE) / MAX_BATTERY_ANIMATION;
    this._numberMesh.animate(battery);
  }

  /** 座標を更新する */
  _refreshPos(): void {
    this._numberMesh.getObject3D().position.x = 150;
    this._numberMesh.getObject3D().position.y = 150;
    this._numberMesh.getObject3D().position.z = 20;
  }

  /** 透明度を更新する */
  _refreshOpacity(model: BatteryNumberModel): void {
    this._numberMesh.setOpacity(model.alpha);
  }
}
