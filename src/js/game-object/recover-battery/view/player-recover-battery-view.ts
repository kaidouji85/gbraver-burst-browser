import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../td-position";
import type { RecoverBatteryModel } from "../model/recover-battery-model";
import type { RecoverBatteryView } from "./recover-battery-view";
export const MESH_SIZE = 100;
export const MAX_ANIMATION = 16;
export const SIGN_FRAME = 10 / MAX_ANIMATION;
export const MAX_BATTERY = 9;
export const SIGN_PADDING = 70;
export const GROUP_PADDING = 30;

/** プレイヤーのバッテリー回復*/
export class PlayerRecoverBatteryView implements RecoverBatteryView {
  #group: THREE.Group;
  #signMesh: HorizontalAnimationMesh;
  #numberMesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const batteryNumberResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.BATTERY_NUMBER,
    );
    const batteryNumber = batteryNumberResource
      ? batteryNumberResource.texture
      : new THREE.Texture();
    this.#signMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: MAX_ANIMATION,
    });
    this.#group.add(this.#signMesh.getObject3D());
    this.#numberMesh = new HorizontalAnimationMesh({
      texture: batteryNumber,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: MAX_ANIMATION,
    });
    this.#group.add(this.#numberMesh.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this.#signMesh.destructor();
    this.#numberMesh.destructor();
  }

  /**
   * モデルのビューに反映させる
   *
   * @param model モデル
   */
  engage(model: RecoverBatteryModel): void {
    this.#signMesh.animate(SIGN_FRAME);
    this.#signMesh.opacity(model.opacity);
    this.#signMesh.getObject3D().position.x = -SIGN_PADDING + GROUP_PADDING;
    this.#signMesh.getObject3D().position.z = 1;
    const battery = Math.min(model.value, MAX_BATTERY) / MAX_ANIMATION;
    this.#numberMesh.animate(battery);
    this.#numberMesh.opacity(model.opacity);
    this.#numberMesh.getObject3D().position.x = GROUP_PADDING;
    this.#numberMesh.getObject3D().position.z = 0;
    this.#group.position.x = ARMDOZER_EFFECT_STANDARD_X;
    this.#group.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this.#group.position.z = ARMDOZER_EFFECT_STANDARD_Z;
    this.#group.scale.set(model.scale, model.scale, model.scale);
  }

  /**
   * カメラの方向を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
