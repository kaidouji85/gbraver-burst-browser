import * as R from "ramda";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";

export const NUMBER_OF_DIGITS = 4;
export const MAX_ANIMATION = 16;
export const MESH_SIZE = 64;
export const MAX_HP = 9999;
export const MIN_HP = 0;

/** HP数字 */
export class HpNumber {
  #group: THREE.Group;
  #meshList: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const hpNumber = findTextureOrThrow(
      resources,
      TEXTURE_IDS.HP_NUMBER,
    ).texture;
    this.#meshList = R.times((v) => {
      const mesh = new HorizontalAnimationMesh({
        texture: hpNumber,
        maxAnimation: MAX_ANIMATION,
        width: MESH_SIZE,
        height: MESH_SIZE,
      });
      mesh.getObject3D().position.x = -v * 32;
      return mesh;
    }, NUMBER_OF_DIGITS);
    this.#meshList.forEach((v) => {
      this.#group.add(v.getObject3D());
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#meshList.forEach((v) => {
      v.destructor();
    });
  }

  /**
   * HP数字の値を設定する
   *
   * @param value 設定する値
   */
  setValue(value: number): void {
    this.#meshList.forEach((v) => {
      v.opacity(0);
    });
    const correctValue = this.#correctValue(value);
    const values = String(correctValue)
      .split("")
      .reverse()
      .map((v) => Number(v));
    R.zip(this.#meshList, values)
      .map((v) => ({
        mesh: v[0],
        value: v[1],
      }))
      .forEach((v: { mesh: HorizontalAnimationMesh; value: number }) => {
        v.mesh.animate(v.value / MAX_ANIMATION);
        v.mesh.opacity(1);
      });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * HP数字を表示できる範囲に補正する
   *
   * @param value 補正前
   * @returns 補正結果
   */
  #correctValue(value: number): number {
    if (value < MIN_HP) {
      return MIN_HP;
    } else if (MAX_HP < value) {
      return MAX_HP;
    } else {
      return Math.floor(value);
    }
  }
}
