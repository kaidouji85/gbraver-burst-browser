// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import type {Resources} from "../../../../resource/index";
import {HpGaugeView} from './hp-gauge-view';
import type {HpGaugeModel} from "../model/hp-gauge-model";
import {drawPlayerHpGauge} from "../../../../canvas/hp-gauge";

/** メッシュの大きさ */
export const MESH_SIZE = 300;

/** 上パディング */
export const PADDING_TOP = 40;

/** プレイヤーHPゲージ */
export class PlayerHpGaugeView implements HpGaugeView {
  /** デバイスに応じたHPゲージの倍率 */
  _scale: number;
  /** ゲージ画像を描画するメッシュ */
  _canvasMesh: CanvasMesh;
  /** ゲームループ処理で使うために、リソース管理オブジェクトをキャッシュする */
  _resources: Resources;

  constructor(resources: Resources, scale: number) {
    this._canvasMesh = new CanvasMesh({
      resources,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: 256,
      canvasHeight: 256,
    });
    this._scale = scale;
    this._resources = resources;
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: HpGaugeModel): void {
    this._canvasMesh.mesh.scale.set(this._scale, this._scale, this._scale);
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** ゲージを更新する */
  _refreshGauge(model: HpGaugeModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawPlayerHpGauge(context, this._resources, context.canvas.width / 2, context.canvas.height / 2, model.hp, model.maxHp);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = (window.innerWidth - MESH_SIZE * this._scale) / 2;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}