// @flow

import * as THREE from "three";
import * as R from 'ramda';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";

export const NUMBER_OF_DIGITS = 4;
export const MAX_ANIMATION = 16;
export const MESH_SIZE = 64;
export const MAX_HP = 9999;
export const MIN_HP = 0;

/** HP数字 */
export class HpNumber {
  _group: THREE.Group;
  _meshList: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const hpNumberResource = resources.textures.find(v => v.id === TEXTURE_IDS.HP_NUMBER);
    const hpNumber = hpNumberResource
      ? hpNumberResource.texture
      : new THREE.Texture();
    this._meshList = R.times(v => {
      const mesh = new HorizontalAnimationMesh({
        texture: hpNumber,
        maxAnimation: MAX_ANIMATION,
        width: MESH_SIZE,
        height: MESH_SIZE,
      });
      mesh.getObject3D().position.x = -v * 32;
      return mesh;
    },NUMBER_OF_DIGITS);
    this._meshList.forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /**
   * HP数字の値を設定する
   *
   * @param 設定する値
   */
  setValue(value: number): void {
    this._meshList.forEach(v => {
      v.setOpacity(0);
    });

    const correctValue = this._correctValue(value);
    const values = String(correctValue)
      .split('')
      .reverse()
      .map(v => Number(v));
    R.zip(this._meshList, values)
      .map(v => ({mesh: v[0], value: v[1]}))
      .forEach((v: {mesh: HorizontalAnimationMesh, value: number}) => {
        v.mesh.animate(v.value / MAX_ANIMATION);
        v.mesh.setOpacity(1);
      });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /**
   * HP数字を表示できる範囲に補正する
   *
   * @param value 補正前
   * @return 補正結果
   */
  _correctValue(value: number): number {
    if (value < MIN_HP) {
      return MIN_HP;
    } else if (MAX_HP < value) {
      return MAX_HP;
    } else {
      return Math.floor(value);
    }
  }
}