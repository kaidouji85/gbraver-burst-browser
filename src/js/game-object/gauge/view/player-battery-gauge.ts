import * as R from "ramda";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { Battery } from "../model/gauge-model";
import { BatteryGaugeUnit } from "./battery-gauge-unit";

/** バッテリー最大値 */
export const MAX_BATTERY = 5;

/** プレイヤーバッテリー */
export class PlayerBatteryGauge {
  #group: THREE.Group;
  #frame: HorizontalAnimationMesh;
  #gaugeList: BatteryGaugeUnit[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    
    const frameTexture = resources.textures.find(v => v.id === TEXTURE_IDS.PLAYER_BATTERY_GAUGE)?.texture ?? new THREE.Texture();
    this.#frame = new HorizontalAnimationMesh({
      texture: frameTexture,
      width: 1024,
      height: 1024,
      maxAnimation: 1
    });
    this.#frame.getObject3D().position.x = 165;
    this.#frame.getObject3D().position.z = -0.1;
    this.#group.add(this.#frame.getObject3D());
    
    this.#gaugeList = R.times((v) => v + 1, MAX_BATTERY).map(
      (v) => new BatteryGaugeUnit(resources, v)
    );
    this.#gaugeList.forEach((gauge, index) => {
      gauge.getObject3D().position.x = index * 95;
      this.#group.add(gauge.getObject3D());
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#frame.destructor();
    this.#gaugeList.forEach((v) => {
      v.destructor();
    });
  }

  /**
   * バッテリーゲージモデルを反映させる
   * @param batteryList モデル
   */
  engage(batteryList: Battery[]): void {
    batteryList.forEach((v) => {
      const gauge = this.#gaugeList.find(
        (gauge) => gauge.getValue() === v.value
      );

      if (!gauge) {
        return;
      }

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
