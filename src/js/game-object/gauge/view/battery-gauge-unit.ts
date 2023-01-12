import * as THREE from "three";

import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";

/** バッテリーゲージ1マス分 */
export class BatteryGaugeUnit {
  #group: THREE.Group;
  #gauge: SimpleImageMesh;
  #back: SimpleImageMesh;
  #value: number;
  #brightness: number;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param value バッテリー値
   */
  constructor(resources: Resources, value: number) {
    this.#group = new THREE.Group();
    this.#value = value;
    this.#brightness = 1;
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

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    this.#gauge.destructor();
    this.#back.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * バッテリー値を取得
   * @return バッテリー値
   */
  getValue(): number {
    return this.#value;
  }

  /**
   * 透明度を設定
   * @param opacity 0〜1で指定する透明度、0で完全透明
   */
  setOpacity(opacity: number): void {
    this.#back.setOpacity(opacity);
    this.#gauge.setOpacity(opacity * this.#brightness);
  }

  /**
   * 輝度を設定
   * @param brightness 0〜1で指定する輝度
   */
  setBrightness(brightness: number): void {
    this.#brightness = brightness;
    this.#gauge.setOpacity(brightness);
  }
}
