import * as R from "ramda";
import * as THREE from "three";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";

import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import { toTouchStartRaycaster } from "../../../render/overlap-event/touch-start-raycaster";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { Battery } from "../model/gauge-model";

/** バッテリー最大値 */
export const MAX_BATTERY = 5;

/** プレイヤーバッテリー */
export class PlayerBatteryGauge {
  #group: THREE.Group;
  #base: HorizontalAnimationMesh;
  #gaugeList: BatteryGaugeUnit[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    
    const batteryGauge = resources.textures.find(v => v.id === TEXTURE_IDS.PLAYER_BATTERY_GAUGE)?.texture ?? new THREE.Texture();
    const batteryGuageWitdh = 1024;
    const batteryGaugeHeight = 1024;
    this.#base = new HorizontalAnimationMesh({
      texture: batteryGauge,
      width: batteryGuageWitdh,
      height: batteryGaugeHeight,
      maxAnimation: 1
    });
    this.#base.getObject3D().position.x = 165;
    this.#group.add(this.#base.getObject3D());
    
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

/** バッテリーゲージ1マス分 */
class BatteryGaugeUnit {
  #group: THREE.Group;
  #gauge: SimpleImageMesh;
  #back: SimpleImageMesh;
  #value: number;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param value バッテリー値
   */
  constructor(resources: Resources, value: number) {
    this.#group = new THREE.Group();
    this.#value = value;
    const gaugeImage =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE
      )?.image ?? new Image();
    this.#gauge = new SimpleImageMesh({
      image: gaugeImage,
      imageWidth: 88,
      meshSize: 128,
      canvasSize: 128,
    });
    this.#gauge.getObject3D().position.z = 1;
    this.#group.add(this.#gauge.getObject3D());
    const backImage =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE_BACK
      )?.image ?? new Image();
    this.#back = new SimpleImageMesh({
      image: backImage,
      imageWidth: 88,
      meshSize: 128,
      canvasSize: 128,
    });
    this.#back.getObject3D().position.z = 0;
    this.#group.add(this.#back.getObject3D());
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this.#gauge.destructor();
    this.#back.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * バッテリー値を取得
   *
   * @return バッテリー値
   */
  getValue(): number {
    return this.#value;
  }

  /**
   * 透明度を設定
   *
   * @param opacity 0〜1で指定する透明度、0で完全透明
   */
  setOpacity(opacity: number): void {
    this.#gauge.setOpacity(opacity);
  }
}
