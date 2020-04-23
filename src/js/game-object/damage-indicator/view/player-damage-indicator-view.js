// @flow

import * as R from 'ramda';
import type {DamageIndicatorView} from "./damage-indicator-view";
import type {Resources} from "../../../resource";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";

export const MESH_SIZE = 40;
export const MAX_NUMBER_SIZE = 4;
export const MAX_ANIMATION = 16;
export const MINUS_SIGN_FRAME = 11 / MAX_ANIMATION;

/** プレイヤーのダメージインジケータビュー */
export class PlayerDamageIndicatorView implements DamageIndicatorView {
  _group: THREE.Group;
  _sign: HorizontalAnimationMesh;
  _numbers: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const damageNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.DAMAGE_NUMBER);
    const damageNumber: THREE.Texture = damageNumberResource ? damageNumberResource.texture : new THREE.Texture();

    this._sign = new HorizontalAnimationMesh({
      texture: damageNumber,
      maxAnimation: MAX_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
    this._group.add(this._sign.getObject3D());

    this._numbers = R.times(v => {
      const mesh = new HorizontalAnimationMesh({
        texture: damageNumber,
        maxAnimation: MAX_ANIMATION,
        width: MESH_SIZE,
        height: MESH_SIZE,
      });
      this._group.add(mesh.getObject3D());
      return mesh;
    }, MAX_NUMBER_SIZE);
  }

  /** デストラクタ */
  destructor(): void {
    this._sign.destructor();
    this._numbers.forEach(v => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    const values: number[] = String(model.damage)
      .split('')
      .map(v => Number(v));
    const baseX = -values.length * MESH_SIZE / 2;

    this._sign.setOpacity(model.opacity);
    this._sign.animate(MINUS_SIGN_FRAME);
    this._sign.getObject3D().position.x = baseX;

    this._numbers.forEach((mesh, index: number) => {
      const hasValue = (index in values);
      const value = hasValue
        ? values[index]
        : 0;
      const animate =value / MAX_ANIMATION;
      const positionX = baseX + (index + 1) * MESH_SIZE
      const opacity = hasValue
        ? model.opacity
        : 0;
      mesh.animate(animate);
      mesh.getObject3D().position.x = positionX;
      mesh.setOpacity(opacity);
    });

    this._group.position.x = ARMDOZER_EFFECT_STANDARD_X;
    this._group.position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this._group.position.z = ARMDOZER_EFFECT_STANDARD_Z + 20;
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}