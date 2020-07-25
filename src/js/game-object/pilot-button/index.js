// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../mesh/simple-image-mesh";
import type {Resources} from "../../resource";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";


/** キャンバスサイズ */
const CANVAS_SIZE = 512;

/** 全体のスケール */
const GROUP_SCALE = 0.3;

/** 左パディング */
const PADDING_LEFT = 80;

/** 下パディング */
const PADDING_BOTTOM = 80;

/**
 * パイロットボタン
 */
export class PilotButton {
  _button: SimpleImageMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const pilotButtonResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.PILOT_BUTTON);
    const pilotButton: Image = pilotButtonResource
      ? pilotButtonResource.image
      : new Image();
    this._button = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: CANVAS_SIZE,
      image: pilotButton,
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._button.getObject3D();
  }
}