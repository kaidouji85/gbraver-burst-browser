// @flow

import {PlayerReflectView} from "./player-reflect-view";
import type {Resources} from "../../../resource";
import type {PopUpModel} from "../../pop-up/pop-up/model/pop-up-model";

/**
 * 敵 ダメージ反射 ビュー
 */
export class EnemyReflectView extends PlayerReflectView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: PopUpModel): void {
    super.engage(model);

    const target = this.getObject3D();
    target.position.x *= -1;
  }
}