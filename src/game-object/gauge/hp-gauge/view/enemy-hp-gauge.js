// @flow

import {CanvasMesh} from "../../../../util/mesh/canvas-mesh";
import type {Resources} from "../../../../resource/resource-manager";
import {HpGaugeView} from './hp-gauge-view';
import type {HpGaugeModel} from "../model/hp-gauge-model";
import {drawEnemyHpGauge} from "../../../../util/canvas/draw/hp-gauge";
import {rectangle} from "../../../../util/uv-mapping/rectangle";
import * as THREE from "three";

/** 敵HPゲージ */
export class EnemyHpGaugeView extends CanvasMesh implements HpGaugeView {
  _modelCache: HpGaugeModel;

  constructor(resources: Resources) {
    const meshWidth = 300;
    const meshHeight = 80;

    super({
      resources,
      meshWidth,
      meshHeight,
      canvasWidth: 256,
      canvasHeight: 256,
    });
    this._modelCache = {
      hp: 0,
      maxHp: 0
    };

    // HPゲージに必要な大きさだけテクスチャから抜き取る
    rectangle({
      geo: this.mesh.geometry,
      pos: new THREE.Vector2(0, 0),
      width: 1,
      height: meshHeight / meshWidth
    });
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: HpGaugeModel): void {
    if(this._isChanged(this._modelCache, model)) {
      this._refreshGauge(model);
    }
    this._modelCache = model;
    this._refreshPos();
  }

  /** モデルが変更されたか否かを判定する、trueで変更された */
  _isChanged(model: HpGaugeModel, newModel: HpGaugeModel): boolean {
    return model.hp !== newModel.hp || model.maxHp !== newModel.maxHp;
  }

  /** ゲージを更新する */
  _refreshGauge(model: HpGaugeModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // UVマッピングの原点は左下なので、HPゲージがテクスチャの一番下に描画されるようにする
      drawEnemyHpGauge(context, this.resources, context.canvas.width/2, context.canvas.height - 32, model.hp, model.maxHp);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this.mesh.position.x = (-window.innerWidth + this.meshWidth) / 2;
    this.mesh.position.y = window.innerHeight / 2  - 40;
  }
}