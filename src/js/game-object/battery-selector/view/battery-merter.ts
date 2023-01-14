import * as R from "ramda";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { BatterySelectorModel } from "../model";
import { batteryNumber, batteryNumberPosition } from "./battery-number";

/** バッテリーゲージの最大数字 */
export const MAX_VALUE = 8;

/** バッテリーメーター */
export class BatteryMeter {
  #group: THREE.Group;
  #disk: SimpleImageMesh;
  #needle: SimpleImageMesh;
  #numbers: HorizontalAnimationMesh[];
  #disActiveNumbers: HorizontalAnimationMesh[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();

    const disk =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_METER
      )?.image ?? new Image();
    this.#disk = new SimpleImageMesh({
      canvasSize: 1024,
      meshSize: 1024,
      image: disk,
      imageWidth: 539,
    });
    this.#group.add(this.#disk.getObject3D());

    const disActiveNumber =
      resources.textures.find(
        (v) => v.id === TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER
      )?.texture ?? new THREE.Texture();
    this.#disActiveNumbers = R.times(R.identity, MAX_VALUE + 1).map(
      (value: number) => batteryNumber(value, disActiveNumber)
    );
    this.#disActiveNumbers.forEach((v) => this.#group.add(v.getObject3D()));

    const activeNumber =
      resources.textures.find(
        (v) => v.id === TEXTURE_IDS.BATTERY_SELECTOR_NUMBER
      )?.texture ?? new THREE.Texture();
    this.#numbers = R.times(R.identity, MAX_VALUE + 1).map((value: number) =>
      batteryNumber(value, activeNumber)
    );
    this.#numbers.forEach((v) => this.#group.add(v.getObject3D()));

    const needle =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_NEEDLE
      )?.image ?? new Image();
    this.#needle = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: needle,
      imageWidth: 512,
    });
    this.#needle.getObject3D().position.y = 1;
    this.#group.add(this.#needle.getObject3D());
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this.#disk.destructor();
    this.#needle.destructor();
    this.#numbers.forEach((v) => {
      v.destructor();
    });
    this.#disActiveNumbers.forEach((v) => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  update(model: BatterySelectorModel): void {
    this.#needle.getObject3D().rotation.z = Math.PI * (1 - model.needle);
    this.#disk.setOpacity(model.opacity);
    this.#needle.setOpacity(model.opacity);
    this.#numbers.forEach((numberMesh, value) => {
      const { x, y } = batteryNumberPosition(value, model.maxBattery);
      numberMesh.getObject3D().position.x = x;
      numberMesh.getObject3D().position.y = y;
      value <= model.enableMaxBattery
        ? numberMesh.setOpacity(model.opacity)
        : numberMesh.setOpacity(0);
    });
    this.#disActiveNumbers.forEach((numberMesh, value) => {
      const { x, y } = batteryNumberPosition(value, model.maxBattery);
      numberMesh.getObject3D().position.x = x;
      numberMesh.getObject3D().position.y = y;
      (model.enableMaxBattery < value)　&& (value <= model.maxBattery)
        ? numberMesh.setOpacity(model.opacity)
        : numberMesh.setOpacity(0);
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
