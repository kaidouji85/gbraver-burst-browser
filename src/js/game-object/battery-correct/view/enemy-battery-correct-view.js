// @flow

import {PlayerBatteryCorrectView} from "./player-battery-correct-view";
import type {Resources} from "../../../resource";
import type {BatteryCorrectModel} from "../model/battery-correct-model";

/** 敵側バッテリー補正ビュー */
export class EnemyBatteryCorrectView extends PlayerBatteryCorrectView {
  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: BatteryCorrectModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.position.x *= -1;
  }
}