import type { Resources } from "../../../resource";
import type { BatteryNumberModel } from "../model/battery-number-model";
import { PlayerBatteryNumberView } from "./player-battery-number-view";

/** 敵のバッテリー数字ビュー */
export class EnemyBatteryNumberView extends PlayerBatteryNumberView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: BatteryNumberModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
  }
}
