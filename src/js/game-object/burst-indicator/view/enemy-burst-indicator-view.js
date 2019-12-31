// @flow

import {PlayerBurstIndicatorView} from "./player-burst-indicator-view";
import type {Resources} from "../../../resource";
import type {BurstIndicatorModel} from "../model/burst-indicator-model";

/** 敵のバーストインジケータビュー */
export class EnemyBurstIndicatorView extends PlayerBurstIndicatorView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BurstIndicatorModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
  }
}