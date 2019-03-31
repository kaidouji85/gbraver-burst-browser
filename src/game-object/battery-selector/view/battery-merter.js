// @flow

import * as THREE from "three";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {CanvasMesh} from "../../../mesh/canvas-mesh";

/** メーター板の大きさ */
export const DISK_SIZE = 1024;

/** メーター針の大きさ */
export const NEEDLE_SIZE = 512;

/** バッテリーメーター */
export class BatteryMeter {
  _group: THREE.Group;
  _disk: SimpleImageMesh;
  _needle: CanvasMesh;

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
  }

  /**
   * メーターの値を設定する
   *
   * @param value メーターの値、0〜1のパーセント
   */
  setValue(value: number): void {
    this._needle.getObject3D().rotation.z = Math.PI * (1- value);
  }

  /** 透明度を設定する */
  setOpacity(opacity: number): void {
    this._disk.setOpacity(opacity);
    this._needle.setOpacity(opacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}