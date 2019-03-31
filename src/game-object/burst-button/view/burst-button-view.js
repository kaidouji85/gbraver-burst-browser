// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {BurstButtonModel} from "../model/burst-button-model";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";

/** キャンバスサイズ */
const CANVAS_SIZE = 512;

/** 全体のスケール */
const SCALE = 0.3;

/** 左パディング */
const PADDING_LEFT = 80;

/** 下パディング */
const PADDING_BOTTOM = 80;

// TODO 当たり判定を追加する
/** バーストボタンのビュー */
export class BurstButtonView {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const imageResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON);
    const image = imageResource
      ? imageResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      image: image
    });
    this._mesh.getObject3D().scale.set(SCALE, SCALE, SCALE);
  }

  /** モデルをビューに反映させる */
  engage(model: BurstButtonModel): void {
    this._mesh.setOpacity(model.opacity);
    this._setPos();
  }

  /** 本ビューで使うthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }

  /** 表示位置を更新する */
  _setPos(): void {
    this._mesh.getObject3D().position.x = -window.innerWidth / 2 + PADDING_LEFT;
    this._mesh.getObject3D().position.y = -window.innerHeight / 2 + PADDING_BOTTOM;
  }
}