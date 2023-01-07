import * as R from "ramda";
import * as THREE from "three";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { BatterySelectorModel } from "../model";

/** バッテリーゲージの最大数字 */
export const MAX_VALUE = 5;

/** バッテリーメーター */
export class BatteryMeter {
  #group: THREE.Group;
  #disk: SimpleImageMesh;
  #needle: SimpleImageMesh;
  #numbers: HorizontalAnimationMesh[];
  #disActiveNumbers: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const disk = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_METER)?.image ?? new Image();
    this.#disk = new SimpleImageMesh({
      canvasSize: 1024,
      meshSize: 1024,
      image: disk,
      imageWidth: 539
    });
    this.#group.add(this.#disk.getObject3D());
    const disActiveNumber = resources.textures.find(v => v.id === TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER)?.texture ?? new THREE.Texture();
    this.#disActiveNumbers = R.times(R.identity, MAX_VALUE + 1).map((value: number) => batteryNumber(value, disActiveNumber));
    this.#disActiveNumbers.forEach(v => this.#group.add(v.getObject3D()));
    const activeNumber = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_SELECTOR_NUMBER)?.texture ?? new THREE.Texture();
    this.#numbers = R.times(R.identity, MAX_VALUE + 1).map((value: number) => batteryNumber(value, activeNumber));
    this.#numbers.forEach(v => this.#group.add(v.getObject3D()));
    const needle = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NEEDLE)?.image ?? new Image();
    this.#needle = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: needle,
      imageWidth: 512
    });
    this.#needle.getObject3D().position.y = 1;
    this.#group.add(this.#needle.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this.#disk.destructor();
    this.#needle.destructor();
    this.#numbers.forEach(v => {
      v.destructor();
    });
    this.#disActiveNumbers.forEach(v => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this.#needle.getObject3D().rotation.z = Math.PI * (1 - model.needle);
    this.#disk.setOpacity(model.opacity);
    this.#needle.setOpacity(model.opacity);
    this.#numbers.forEach((numberMesh, value) => value <= model.enableMaxBattery ? numberMesh.setOpacity(model.opacity) : numberMesh.setOpacity(0));
    this.#disActiveNumbers.forEach((numberMesh, value) => {
      model.enableMaxBattery < value ? numberMesh.setOpacity(model.opacity) : numberMesh.setOpacity(0);
    });
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

}

/**
 * バッテリーセレクタ数字のCanvasMeshを生成するヘルパー関数
 *
 * @param value 数字の値
 * @param texture テクスチャ
 * @return バッテリーセレクタ数字
 */
function batteryNumber(value: number, texture: typeof THREE.Texture): HorizontalAnimationMesh {
  const maxAnimation = 8;
  const numberMesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation,
    width: 64,
    height: 64
  });
  numberMesh.animate(value / 8);
  const angle = Math.PI - Math.PI / MAX_VALUE * value;
  const radius = 155;
  numberMesh.getObject3D().position.x = radius * Math.cos(angle);
  numberMesh.getObject3D().position.y = radius * Math.sin(angle);
  return numberMesh;
}