// @flow

import * as THREE from "three";
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {BatterySelectorModel} from "../model";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";

/** バッテリーゲージの最大数字 */
export const MAX_VALUE = 5;

/** バッテリーメーター */
export class BatteryMeter {
  _group: typeof THREE.Group;
  _disk: SimpleImageMesh;
  _needle: SimpleImageMesh;
  _numbers: HorizontalAnimationMesh[];
  _disActiveNumbers: HorizontalAnimationMesh[];

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const disk = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_METER)?.image ?? new Image();
    this._disk = new SimpleImageMesh({canvasSize: 1024, meshSize: 1024, image: disk, imageWidth: 539});
    this._group.add(this._disk.getObject3D());

    const disActiveNumber = resources.textures
      .find(v => v.id === TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER)?.texture ?? new THREE.Texture();
    this._disActiveNumbers = R.times(R.identity, MAX_VALUE + 1)
      .map((value: number) => batteryNumber(value, disActiveNumber));
    this._disActiveNumbers.forEach(v => this._group.add(v.getObject3D()));

    const activeNumber = resources.textures
      .find(v => v.id === TEXTURE_IDS.BATTERY_SELECTOR_NUMBER)?.texture ?? new THREE.Texture();
    this._numbers = R.times(R.identity, MAX_VALUE + 1)
      .map((value: number) => batteryNumber(value, activeNumber));
    this._numbers.forEach(v => this._group.add(v.getObject3D()));

    const needle = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NEEDLE)?.image ?? new Image();
    this._needle = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: needle, imageWidth: 512});
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
    this._numbers.forEach((numberMesh, value) =>
      value <= model.enableMaxBattery
        ? numberMesh.setOpacity(model.opacity)
        : numberMesh.setOpacity(0)
    );
    this._disActiveNumbers.forEach((numberMesh, value) => {
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
 * @param texture テクスチャ
 * @return バッテリーセレクタ数字
 */
function batteryNumber(value: number, texture: typeof THREE.Texture): HorizontalAnimationMesh {
  const maxAnimation = 8;
  const numberMesh = new HorizontalAnimationMesh({texture, maxAnimation, width: 64, height: 64});
  numberMesh.animate(value/8);
  const angle = Math.PI - Math.PI / MAX_VALUE * value;
  const radius = 155;
  numberMesh.getObject3D().position.x = radius * Math.cos(angle);
  numberMesh.getObject3D().position.y = radius * Math.sin(angle);
  return numberMesh;
}