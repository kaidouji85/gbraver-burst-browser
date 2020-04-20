// @flow

import {PlayerPowerUpView} from "./player-power-up-view";
import type {Resources} from "../../../../resource";
import type {PopUpModel} from "../../pop-up/model/pop-up-model";

/**
 * 敵 攻撃アップ ビュー
 */
export class EnemyPowerUpView extends PlayerPowerUpView {
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

    const target = super.getObject3D();
    target.position.x *= -1;
  }
}