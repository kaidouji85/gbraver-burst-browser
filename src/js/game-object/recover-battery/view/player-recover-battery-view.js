// @flow

import * as THREE from 'three';
import type {RecoverBatteryView} from "./recover-battery-view";
import type {RecoverBatteryModel} from "../model/recover-battery-model";
import type {Resources} from "../../../resource";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";

export const MESH_SIZE = 100;
export const MAX_ANIMATION = 16;
export const MAX_BATTERY = 9;
export const NUMBER_X = 20;
export const SIGN_PADDING = 80;

/** プレイヤーのバッテリー回復*/
export class PlayerRecoverBatteryView implements RecoverBatteryView {
  _group: THREE.Group;
  _signMesh: HorizontalAnimationMesh;
  _numberMesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const batteryNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER);
    const batteryNumber: THREE.Texture = batteryNumberResource ? batteryNumberResource.texture : new THREE.Texture();

    this._signMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      mesh: THREE.Mesh,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: MAX_ANIMATION,
    });
    this._signMesh.getObject3D().position.x = NUMBER_X - SIGN_PADDING;
    this._group.add(this._signMesh.getObject3D());

    this._numberMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      mesh: THREE.Mesh,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: MAX_ANIMATION,
    });
    this._numberMesh.getObject3D().position.x = NUMBER_X;
    this._group.add(this._numberMesh.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this._signMesh.destructor();
    this._numberMesh.destructor();
  }

  /**
   * モデルのビューに反映させる
   *
   * @param model モデル
   */
  engage(model: RecoverBatteryModel): void {
    this._refreshValue(model);
    this._refreshOpacity(model);
    this._refreshPos();
  }

  /**
   * カメラの方向を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /**
   * バッテリー値を更新する
   *
   * @param model モデル
   */
  _refreshValue(model: RecoverBatteryModel): void {
    const sign = 10 / MAX_ANIMATION;
    this._signMesh.animate(sign);

    const battery = Math.min(model.value, MAX_BATTERY) / MAX_ANIMATION;
    this._numberMesh.animate(battery);
  }

  /** 座標を更新 */
  _refreshPos(): void {
    this._group.position.x = ARMDOZER_EFFECT_STANDARD_X;
    this._group.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this._group.position.z = ARMDOZER_EFFECT_STANDARD_Z + 20;
  }

  /** 透明度を更新 */
  _refreshOpacity(model: RecoverBatteryModel): void {
    this._signMesh.setOpacity(model.opacity);
    this._numberMesh.setOpacity(model.opacity);
  }
}