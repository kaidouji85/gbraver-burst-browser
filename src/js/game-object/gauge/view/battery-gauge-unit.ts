import * as THREE from "three";

import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image/ids";
import { BatteryGaugeUnitProps } from "../model/battery-gauge-unit-model";

/** バッテリーユニットゲージ幅（ピクセル） */
export const BATTERY_UNIT_GAUGE_PIXEL_WIDTH = 88;

/** バッテリーゲージ1マス分 */
export class BatteryGaugeUnit {
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
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE,
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
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_GAUGE_BACK,
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

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    this.#gauge.destructor();
    this.#back.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * バッテリー値を取得
   * @returns バッテリー値
   */
  getValue(): number {
    return this.#value;
  }

  engage(props: BatteryGaugeUnitProps): void {
    this.#back.setOpacity(props.opacity);
    this.#gauge.setOpacity(props.opacity * props.brightness);
  }
}
