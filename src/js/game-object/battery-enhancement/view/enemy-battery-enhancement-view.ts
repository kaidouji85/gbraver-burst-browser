import type { Resources } from "../../../resource";
import type { BatteryEnhancementModel } from "../model/battery-enhancement-model";
import { PlayerBatteryEnhancementView } from "./player-battery-enhancement-view";

/**
 * 敵 バッテリー増強 ビュー
 */
export class EnemyBatteryEnhancementView extends PlayerBatteryEnhancementView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BatteryEnhancementModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }
}
