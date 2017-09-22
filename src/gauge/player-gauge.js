//@flow

import type {Resources,} from '../common/resource-manager';
import ThreeLib from 'three-js';
import {CANVAS_PICTURE_PATH} from '../common/resource-manager';
import {createCanvasMesh} from '../common/mesh-creator';

const THREE = ThreeLib([]);

/** 画像幅 */
export const PICT_WIDTH = 240;
/** 画像高 */
export const PICT_HEIGHT = 148;
/** キャンバス幅 */
export const CANVAS_WIDTH = 256;
/** キャンバス高 */
export const CANVAS_HEIGHT = 256;
/** メッシュ幅 */
export const MESH_WIDTH = 300;
/** メッシュ高 */
export const MESH_HEIGHT = 300;

/**
 * プレイヤーゲージのクラス
 */
export class PlayerGauge {
  /** リソース管理クラス */
  resources: Resources;

  /** メッシュ */
  mesh: THREE.Mesh;

  /** 描画を行うキャンバス */
  canvas: HTMLCanvasElement;

  constructor(resources: Resources) {
    this.resources = resources;
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.mesh = createCanvasMesh(this.canvas, MESH_WIDTH, MESH_HEIGHT);

    this.refresh();
  }

  /** ゲージをリフレッシュする */
  refresh() {
    const image = this.resources.canvasImages.find(item => item.path === CANVAS_PICTURE_PATH.PLAYER_GAUGE);
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(image.image, (CANVAS_WIDTH - PICT_WIDTH)/2, (CANVAS_HEIGHT - PICT_HEIGHT)/2);
  }
}