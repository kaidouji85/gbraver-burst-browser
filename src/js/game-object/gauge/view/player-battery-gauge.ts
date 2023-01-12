import * as R from "ramda";
import * as THREE from "three";

import type { Resources } from "../../../resource";
import type { BatteryGaugeUnitModel } from "../model/gauge-model";
import { BatteryLimit } from "../model/gauge-model";
import { BatteryGaugeUnit } from "./battery-gauge-unit";

/** プレイヤーバッテリー */
export class PlayerBatteryGauge {
  #group: THREE.Group;
  #gaugeList: BatteryGaugeUnit[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();

    this.#gaugeList = R.times((v) => v + 1, BatteryLimit).map(
      (v) => new BatteryGaugeUnit(resources, v)
    );
    this.#gaugeList.forEach((gauge, index) => {
      gauge.getObject3D().position.x = index * 95;
      this.#group.add(gauge.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#gaugeList.forEach((v) => {
      v.destructor();
    });
  }

  /**
   * バッテリーゲージモデルを反映させる
   * @param batteryList モデル
   */
  engage(batteryList: BatteryGaugeUnitModel[]): void {
    batteryList.forEach((v) => {
      const gauge = this.#gaugeList.find(
        (gauge) => gauge.getValue() === v.value
      );
      if (!gauge) {
        return;
      }
      gauge.setBrightness(v.brightness);
      gauge.setOpacity(v.opacity);
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
