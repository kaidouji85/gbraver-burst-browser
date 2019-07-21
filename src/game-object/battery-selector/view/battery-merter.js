// @flow

import * as THREE from "three";
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {BatterySelectorModel} from "../model";
import {drawNumberCenter} from "../../../canvas/number/number";

/** メーター板の大きさ */
export const DISK_SIZE = 1024;

/** メーター針の大きさ */
export const NEEDLE_SIZE = 512;

/** メーター数字の大きさ */
export const NUMBER_SIZE = 64;

/** バッテリーゲージの最大数字 */
export const MAX_VALUE = 5;


/** バッテリーメーター */
export class BatteryMeter {
  _group: THREE.Group;
  _disk: SimpleImageMesh;
  _needle: CanvasMesh;
  _numbers: CanvasMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const diskResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_METER);
    const disk = diskResource
      ? diskResource.image
      : new Image();
    this._disk = new SimpleImageMesh({
      canvasSize: DISK_SIZE,
      image: disk
    });
    this._group.add(this._disk.getObject3D());

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
    this._group.add(this._needle.getObject3D());

    const activeNumberResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SELECTOR_NUMBER);
    const activeNumber = activeNumberResource
      ? activeNumberResource.image
      : new Image();
    this._numbers = R.times(R.identity, MAX_VALUE + 1)
      .map((value: number) => {
        const numberMesh =new CanvasMesh({
          canvasWidth: NUMBER_SIZE,
          canvasHeight: NUMBER_SIZE,
          meshWidth: NUMBER_SIZE,
          meshHeight: NUMBER_SIZE,
        });
        numberMesh.draw(context => {
          const x = context.canvas.width / 2;
          const y = context.canvas.height / 2;
          drawNumberCenter(context, activeNumber, x, y, value);
        });
        const angle = Math.PI - Math.PI / MAX_VALUE * value;
        const radius = 160;
        numberMesh.getObject3D().position.x = radius * Math.cos(angle);
        numberMesh.getObject3D().position.y = radius * Math.sin(angle);
        return numberMesh;
      });
    this._numbers.forEach(v => this._group.add(v.getObject3D()));
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this._needle.getObject3D().rotation.z = Math.PI * (1- model.needle);
    this._disk.setOpacity(model.opacity);
    this._needle.setOpacity(model.opacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}