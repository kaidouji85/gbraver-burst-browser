//@flow

import type {Resources,} from '../common/resource-manager';
import ThreeLib from 'three-js';
import {CANVAS_PICTURE_PATH} from '../common/resource-manager';
import {createCanvasMesh} from '../common/mesh-creator';

const THREE = ThreeLib([]);

/**
 * プレイヤーゲージのクラス
 */
export default class PlayerGauge {
  /** リソース管理クラス */
  resources: Resources;

  /** メッシュ */
  mesh: THREE.Mesh;

  /** 描画を行うキャンバス */
  canvas: HTMLCanvasElement;

  constructor(resources: Resources) {
    this.resources = resources;
    this.canvas = document.createElement('canvas');
    this.mesh = createCanvasMesh(this.canvas, 240, 148);

    this.refresh();
  }

  refresh() {
    const image = this.resources.canvasImages.find(item => item.path === CANVAS_PICTURE_PATH.PLAYER_GAUGE);
    const context = this.canvas.getContext('2d');
    context.drawImage(image.image, 0, 0);
  }
}