//@flow

import type {Resources,} from '../common/resource-manager';
import * as THREE from 'three';
import {createCanvasMesh} from '../common/mesh-creator';
import {PlayerHpGauge} from '../canvas-paint/hp-gauge';

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
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    PlayerHpGauge(context, this.resources, CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 3000, 3000);
  }
}