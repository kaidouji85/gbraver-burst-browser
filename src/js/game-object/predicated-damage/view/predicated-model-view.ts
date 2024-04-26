import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { PredicatedDamageModel } from "../model/predicated-damage-model";

/** 最大アニメーション枚数 */
const MAX_ANIMATION = 16;

/** メッシュサイズ */
const MESH_SIZE = 64;

/** コンストラクタのパラメータ */
export type PredicatedDamageViewConstructParams = ResourcesContainer;

/** ダメージ予想 ビュー */
export class PredicatedDamageView {
  /** 数字 */
  #number: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PredicatedDamageViewConstructParams) {
    const { resources } = params;
    const texture =
      resources.textures.find((t) => t.id === TEXTURE_IDS.HP_NUMBER)?.texture ??
      new THREE.Texture();
    this.#number = new HorizontalAnimationMesh({
      texture,
      maxAnimation: MAX_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#number.destructor();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: PredicatedDamageModel): void {
    const { damage } = model;
    this.#number.animate((damage % 10) / MAX_ANIMATION);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#number.getObject3D();
  }
}
