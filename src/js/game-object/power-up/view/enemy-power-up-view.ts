import { Resources } from "../../../resource";
import { PowerUpModel } from "../model/power-up-model";
import { PlayerPowerUpView } from "./player-power-up-view";

/** 敵 攻撃アップ ビュー */
export class EnemyPowerUpView extends PlayerPowerUpView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: PowerUpModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }
}
