// @flow

import type {LightningDozerView} from "./lightning-dozer-view";
import type {Resources} from "../../../../resource";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {lightningDozerStand} from "../mesh/stand";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import * as THREE from "three";

/**
 * プレイヤー側のライトニングドーザビュー
 */
export class PlayerLightingDozerView implements LightningDozerView {
  _stand: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._stand = lightningDozerStand(resources);
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._stand.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void {
    this._stand.getObject3D().position.set(model.position.x, model.position.y, model.position.z);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._stand.getObject3D();
  }
}