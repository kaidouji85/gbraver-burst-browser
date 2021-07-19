// @flow

import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../mesh/horizontal-animation";
import type {Resources} from "../../resource";
import {TEXTURE_IDS} from "../../resource/texture";

export const MESH_SIZE = 100;
export const MAX_BATTERY_ANIMATION = 16;
//export const MAX_BATTERY_VALUE = 9;

/** バッテリー補正 */
export class BatteryCorrect {
  _numberMesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
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

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._numberMesh.getObject3D();
  }
}