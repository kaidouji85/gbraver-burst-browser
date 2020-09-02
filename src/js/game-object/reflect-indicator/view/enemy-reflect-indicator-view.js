// @flow

import {PlayerReflectIndicatorView} from "./player-reflect-indicator-view";
import type {Resources} from "../../../resource";
import type {ReflectIndocatorModel} from "../model/reflect-indocator-model";

/**
 * 敵 ダメージ反射 ビュー
 */
export class EnemyReflectIndicatorView extends PlayerReflectIndicatorView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ReflectIndocatorModel): void {
    super.engage(model);

    const target = this.getObject3D();
    target.position.x *= -1;
  }
}