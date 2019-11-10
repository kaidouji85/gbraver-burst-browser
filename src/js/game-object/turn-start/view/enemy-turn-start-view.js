// @flow

import {PlayerTurnStartView} from "./player-turn-start-view";
import type {Resources} from "../../../resource";
import type {TurnStartModel} from "../model/turn-start-model";

/** 敵ターンスタートビュー */
export class EnemyTurnStartView extends PlayerTurnStartView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model
   */
  engage(model: TurnStartModel): void {
    super.engage(model);
    this._canvas.getObject3D().position.x *= -1;
  }
}