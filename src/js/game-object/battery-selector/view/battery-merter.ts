import * as R from "ramda";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { BatterySelectorModel } from "../model";
import {
  batteryNumber,
  batteryNumberPosition,
  batteryNumberScale,
} from "./battery-number";

/** バッテリーゲージの最大数字 */
export const MAX_VALUE = 8;

/** バッテリーメーター */
export class BatteryMeter {
  #group: THREE.Group;
  #disk: SimpleImageMesh;
  #disk4: HorizontalAnimationMesh;
  #disk8: HorizontalAnimationMesh;
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
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_METER,
      )?.image ?? new Image();
    this.#disk = new SimpleImageMesh({
      canvasSize: 1024,
      meshSize: 1024,
      image: disk,
      imageWidth: 539,
    });
    this.#group.add(this.#disk.getObject3D());

    const disk4 = findTextureOrThrow(
      resources,
      TEXTURE_IDS.BATTERY_METER_4,
    ).texture;
    this.#disk4 = new HorizontalAnimationMesh({
      texture: disk4,
      width: 1024,
      height: 1024,
      maxAnimation: 1,
    });
    this.#group.add(this.#disk4.getObject3D());

    const disk8 = findTextureOrThrow(
      resources,
      TEXTURE_IDS.BATTERY_METER_8,
    ).texture;
    this.#disk8 = new HorizontalAnimationMesh({
      texture: disk8,
      width: 1024,
      height: 1024,
      maxAnimation: 1,
    });
    this.#group.add(this.#disk8.getObject3D());

    const disActiveNumber = findTextureOrThrow(
      resources,
      TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER,
    ).texture;
    this.#disActiveNumbers = R.times(R.identity, MAX_VALUE + 1).map(
      (value: number) => batteryNumber(value, disActiveNumber),
    );
    this.#disActiveNumbers.forEach((v) => this.#group.add(v.getObject3D()));

    const activeNumber = findTextureOrThrow(
      resources,
      TEXTURE_IDS.BATTERY_SELECTOR_NUMBER,
    ).texture;
    this.#numbers = R.times(R.identity, MAX_VALUE + 1).map((value: number) =>
      batteryNumber(value, activeNumber),
    );
    this.#numbers.forEach((v) => this.#group.add(v.getObject3D()));

    const needle =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_NEEDLE,
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
    this.#disk4.destructor();
    this.#disk8.destructor();
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
    const disk4Opacity = model.maxBattery === 4 ? model.opacity : 0;
    this.#disk4.opacity(disk4Opacity);
    const disk8Opacity = model.maxBattery === 8 ? model.opacity : 0;
    this.#disk8.opacity(disk8Opacity);
    const diskOpacity = [4, 8].includes(model.maxBattery) ? 0 : model.opacity;
    this.#disk.setOpacity(diskOpacity);
    this.#needle.setOpacity(model.opacity);
    this.#numbers.forEach((numberMesh, value) => {
      const { x, y } = batteryNumberPosition(value, model.maxBattery);
      numberMesh.getObject3D().position.x = x;
      numberMesh.getObject3D().position.y = y;
      const scale = batteryNumberScale(value, model.maxBattery);
      numberMesh.getObject3D().scale.set(scale, scale, 1);
      const opacity = value <= model.enableMaxBattery ? model.opacity : 0;
      numberMesh.opacity(opacity);
    });
    this.#disActiveNumbers.forEach((numberMesh, value) => {
      const { x, y } = batteryNumberPosition(value, model.maxBattery);
      numberMesh.getObject3D().position.x = x;
      numberMesh.getObject3D().position.y = y;
      const scale = batteryNumberScale(value, model.maxBattery);
      numberMesh.getObject3D().scale.set(scale, scale, 1);
      const opacity =
        model.enableMaxBattery < value && value <= model.maxBattery
          ? model.opacity
          : 0;
      numberMesh.opacity(opacity);
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
