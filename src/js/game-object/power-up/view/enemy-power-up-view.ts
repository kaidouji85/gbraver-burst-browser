import type { Resources } from "../../../resource";
import type { PowerUpModel } from "../model/power-up-model";
import { PlayerPowerUpView } from "./player-power-up-view";

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
  engage(model: PowerUpModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }
}
