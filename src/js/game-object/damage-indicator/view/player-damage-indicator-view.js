// @flow

import * as R from 'ramda';
import type {DamageIndicatorView} from "./damage-indicator-view";
import type {Resources} from "../../../resource";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import {ARMDOZER_EFFECT_STANDARD_X, ARMDOZER_EFFECT_STANDARD_Z} from "../../armdozer/position";

export const MESH_SIZE = 50;
export const MAX_NUMBER_SIZE = 4;
export const MAX_ANIMATION = 16;
export const GROUP_PADDING = 30;

/** プレイヤーのダメージインジケータビュー */
export class PlayerDamageIndicatorView implements DamageIndicatorView {
  _group: typeof THREE.Group;
  _numbers: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const damageNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.DAMAGE_NUMBER);
    const damageNumber = damageNumberResource
      ? damageNumberResource.texture
      : new THREE.Texture();

    this._numbers = R.times(() =>
      new HorizontalAnimationMesh({
        texture: damageNumber,
        maxAnimation: MAX_ANIMATION,
        width: MESH_SIZE,
        height: MESH_SIZE,
      })
    , MAX_NUMBER_SIZE);
    this._numbers.forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._numbers.forEach(v => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    const values: number[] = String(model.damage)
      .split('')
      .map(v => Number(v));
    this._numbers.forEach((mesh, meshIndex) => {
      mesh.setOpacity(0);
      values
        .filter((value, valueIndex) => meshIndex === valueIndex)
        .forEach(value => {
          mesh.animate(value / MAX_ANIMATION);
          mesh.setOpacity(model.opacity);
          mesh.getObject3D().position.x =   MESH_SIZE * (meshIndex -values.length/2) + GROUP_PADDING;
        });
    });

    this._group.position.x = ARMDOZER_EFFECT_STANDARD_X;
    this._group.position.y = 0;
    this._group.position.z = ARMDOZER_EFFECT_STANDARD_Z + 2;

    this._group.scale.set(model.scale, model.scale, model.scale);
  }

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}