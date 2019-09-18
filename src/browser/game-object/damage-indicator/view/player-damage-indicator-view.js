// @flow

import * as R from 'ramda';
import type {DamageIndicatorView} from "./damage-indicator-view";
import type {Resources} from "../../../resource";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";

export const MESH_SIZE = 40;
export const MAX_NUMBER_SIZE = 4;
export const MAX_ANIMATION = 16;

/** プレイヤーのダメージインジケータビュー */
export class PlayerDamageIndicatorView implements DamageIndicatorView {
  _group: THREE.Group;
  _numbers: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const damageNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.DAMAGE_NUMBER);
    const damageNumber: THREE.Texture = damageNumberResource ? damageNumberResource.texture : new THREE.Texture();
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
    this._numbers.forEach(v => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    this._refreshValue(model);
    this._refreshPos();
    this._refreshOpacity(model);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** ダメージ数字を更新する */
  _refreshValue(model: DamageIndicatorModel): void {
    const values = String(model.damage)
      .split('')
      .map(v => Number(v));
    R.zip(this._numbers, values).forEach(([mesh, v], index) => {
      mesh.animate(v / MAX_ANIMATION);
      mesh.getObject3D().position.x = index * MESH_SIZE -(values.length - 1) * MESH_SIZE / 2
    });
  }

  /** 座標を更新する */
  _refreshPos(): void {
    this._group.position.x = 150;
    this._group.position.y = 150;
    this._group.position.z = 20;
  }

  /** 透明度を更新する */
  _refreshOpacity(model: DamageIndicatorModel): void {
    this._numbers.forEach(v => {
      v.setOpacity(model.opacity);
    });
  }
}