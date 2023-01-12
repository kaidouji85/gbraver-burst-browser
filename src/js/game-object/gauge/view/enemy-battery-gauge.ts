import type { Resources } from "../../../resource";
import { PlayerBatteryGauge } from "./player-battery-gauge";

/** 敵のバッテリーゲージ */
export class EnemyBatteryGauge extends PlayerBatteryGauge {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
    this.getObject3D().scale.x *= -1;
  }
}
