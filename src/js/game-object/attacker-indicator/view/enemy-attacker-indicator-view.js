// @flow

import {PlayerAttackerIndicatorView} from "./player-attacker-indicator-view";
import type {Resources} from "../../../resource";
import type {AttackerIndicatorModel} from "../model/attacker-indicator-model";

/** 敵のアタッカーインジケータのビュー */
export class EnemyAttackerIndicatorView extends PlayerAttackerIndicatorView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model
   */
  engage(model: AttackerIndicatorModel): void {
    super.engage(model);
    this._canvas.getObject3D().position.x *= -1;
  }
}