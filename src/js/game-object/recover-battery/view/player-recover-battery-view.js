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
export const SIGN_FRAME = 10 / MAX_ANIMATION;
export const MAX_BATTERY = 9;
export const SIGN_PADDING = 70;
export const GROUP_PADDING = 30;

/** プレイヤーのバッテリー回復*/
export class PlayerRecoverBatteryView implements RecoverBatteryView {
  _group: typeof THREE.Group;
  _signMesh: HorizontalAnimationMesh;
  _numberMesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const batteryNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER);
    const batteryNumber = batteryNumberResource
      ? batteryNumberResource.texture
      : new THREE.Texture();

    this._signMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      mesh: THREE.Mesh,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: MAX_ANIMATION,
    });
    this._group.add(this._signMesh.getObject3D());

    this._numberMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      mesh: THREE.Mesh,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: MAX_ANIMATION,
    });
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
    this._signMesh.animate(SIGN_FRAME);
    this._signMesh.setOpacity(model.opacity);
    this._signMesh.getObject3D().position.x = -SIGN_PADDING + GROUP_PADDING;
    this._signMesh.getObject3D().position.z = 1;

    const battery = Math.min(model.value, MAX_BATTERY) / MAX_ANIMATION;
    this._numberMesh.animate(battery);
    this._numberMesh.setOpacity(model.opacity);
    this._numberMesh.getObject3D().position.x = GROUP_PADDING;
    this._numberMesh.getObject3D().position.z = 0;

    this._group.position.x = ARMDOZER_EFFECT_STANDARD_X;
    this._group.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this._group.position.z = ARMDOZER_EFFECT_STANDARD_Z;

    this._group.scale.set(model.scale, model.scale, model.scale);
  }

  /**
   * カメラの方向を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: typeof THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}