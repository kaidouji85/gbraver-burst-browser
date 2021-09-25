// @flow

import * as THREE from "three";
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {BatterySelectorModel} from "../model";
import {drawNumberCenter} from "../../../canvas/number/number";

/** メーター針の大きさ */
export const NEEDLE_SIZE = 512;

/** バッテリーゲージの最大数字 */
export const MAX_VALUE = 5;


/** バッテリーメーター */
export class BatteryMeter {
  _group: typeof THREE.Group;
  _disk: SimpleImageMesh;
  _needle: CanvasMesh;
  _numbers: CanvasMesh[];
  _disActiveNumbers: CanvasMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const disk = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_METER)?.image ?? new Image();
    this._disk = new SimpleImageMesh({canvasSize: 1024, meshSize: 1024, image: disk, imageWidth: 539});
    this._group.add(this._disk.getObject3D());

    const disActiveNumber = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER)?.image ?? new Image();
    this._disActiveNumbers = R.times(R.identity, MAX_VALUE + 1)
      .map((value: number) => batteryNumber(value, disActiveNumber));
    this._disActiveNumbers.forEach(v => this._group.add(v.getObject3D()));

    const activeNumberResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SELECTOR_NUMBER);
    const activeNumber = activeNumberResource
      ? activeNumberResource.image
      : new Image();
    this._numbers = R.times(R.identity, MAX_VALUE + 1)
      .map((value: number) => batteryNumber(value, activeNumber));
    this._numbers.forEach(v => this._group.add(v.getObject3D()));

    const needleResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NEEDLE);
    const needle = needleResource
      ? needleResource.image
      : new Image();
    this._needle = new CanvasMesh({
      canvasWidth: NEEDLE_SIZE,
      canvasHeight: NEEDLE_SIZE,
      meshWidth: NEEDLE_SIZE,
      meshHeight: NEEDLE_SIZE,
    });
    this._needle.draw(context => {
      const x = context.canvas.width / 2 - 18;
      const y = context.canvas.height / 2 - 19;
      context.drawImage(needle, x, y);
    });
    this._needle.getObject3D().position.y = 1;
    this._group.add(this._needle.getObject3D());

  }

  /** デストラクタ */
  destructor(): void {
    this._disk.destructor();
    this._needle.destructor();
    this._numbers.forEach(v => {
      v.destructor();
    });
    this._disActiveNumbers.forEach(v => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this._needle.getObject3D().rotation.z = Math.PI * (1- model.needle);
    this._disk.setOpacity(model.opacity);
    this._needle.setOpacity(model.opacity);
    this._numbers.forEach((numberMesh: CanvasMesh, value: number) =>
      value <= model.enableMaxBattery
        ? numberMesh.setOpacity(model.opacity)
        : numberMesh.setOpacity(0)
    );
    this._disActiveNumbers.forEach((numberMesh: CanvasMesh, value: number) => {
      model.enableMaxBattery < value
        ? numberMesh.setOpacity(model.opacity)
        : numberMesh.setOpacity(0)
    })
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}

/**
 * バッテリーセレクタ数字のCanvasMeshを生成するヘルパー関数
 *
 * @param value 数字の値
 * @param image 数字画像
 * @return バッテリーセレクタ数字
 */
function batteryNumber(value: number, image: Image): CanvasMesh {
  const numberMesh =new CanvasMesh({canvasWidth: 64, canvasHeight: 64, meshWidth: 64, meshHeight: 64,});
  numberMesh.draw(context => {
    const x = context.canvas.width / 2;
    const y = context.canvas.height / 2;
    drawNumberCenter(context, image, x, y, value);
  });
  const angle = Math.PI - Math.PI / MAX_VALUE * value;
  const radius = 155;
  numberMesh.getObject3D().position.x = radius * Math.cos(angle);
  numberMesh.getObject3D().position.y = radius * Math.sin(angle);
  return numberMesh;
}