// @flow

import type {Resources} from "../../../resource";
import type {ContinuousAttackModel} from "../model/continuous-attack-model";
import {PlayerContinuousAttackView} from "./player-continuous-attack-view";

/**
 * 敵 攻撃アップ ビュー
 */
export class EnemyContinuousAttackView extends PlayerContinuousAttackView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ContinuousAttackModel): void {
    super.engage(model);

    const target = super.getObject3D();
    target.position.x *= -1;
  }
}