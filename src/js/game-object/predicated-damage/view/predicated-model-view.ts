import * as R from "ramda";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { PredicatedDamageModel } from "../model/predicated-damage-model";

/** 最大アニメーション枚数 */
const MAX_ANIMATION = 16;

/** メッシュサイズ */
const MESH_SIZE = 128;

/** メッシュ間隔 */
const MESH_INTERVAL = 64;

/** 数字の最大桁数 */
const NUMBER_OF_DIGITS = 5;

/** 最大ダメージ */
const MAX_DAMAGE = 9999;

/** 最小ダメージ */
const MIN_DAMAGE = 0;

/** コンストラクタのパラメータ */
export type PredicatedDamageViewConstructParams = ResourcesContainer;

/** ダメージ予想 ビュー */
export class PredicatedDamageView {
  /** グループ */
  #group: THREE.Group;
  /** 数字メッシュをあつめたもの */
  #numbers: HorizontalAnimationMesh[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PredicatedDamageViewConstructParams) {
    const { resources } = params;

    this.#group = new THREE.Group();

    const texture =
      resources.textures.find(
        (t) => t.id === TEXTURE_IDS.PREDICATED_DAMAGE_NUMBER,
      )?.texture ?? new THREE.Texture();

    this.#numbers = R.times((v) => {
      const mesh = new HorizontalAnimationMesh({
        texture,
        maxAnimation: MAX_ANIMATION,
        width: MESH_SIZE,
        height: MESH_SIZE,
      });
      mesh.getObject3D().position.x = -v * MESH_INTERVAL;
      return mesh;
    }, NUMBER_OF_DIGITS);
    this.#numbers.forEach((n) => {
      this.#group.add(n.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#numbers.forEach((n) => {
      n.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: PredicatedDamageModel): void {
    const { damage, opacity } = model;

    this.#numbers.forEach((n) => {
      n.opacity(0);
    });
    const correctDamage = Math.max(MIN_DAMAGE, Math.min(damage, MAX_DAMAGE));
    const values = String(correctDamage)
      .split("")
      .reverse()
      .map((v) => Number(v));
    R.zip(this.#numbers, values)
      .map((n) => ({
        mesh: n[0],
        value: n[1],
      }))
      .forEach(({ mesh, value }) => {
        mesh.animate(value / MAX_ANIMATION);
        mesh.opacity(opacity);
      });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
