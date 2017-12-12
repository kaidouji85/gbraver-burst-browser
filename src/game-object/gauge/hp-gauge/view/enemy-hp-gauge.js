// @flow

import {CanvasMesh} from "../../../../util/mesh/canvas-mesh";
import type {Resources} from "../../../../resource/resource-manager";
import {HpGaugeView} from '../base';
import type {HpGaugeModel} from "../base";
import {drawEnemyHpGauge} from "../../../../util/canvas/draw/hp-gauge";


/** 敵HPゲージ */
export class EnemyHpGaugeView extends CanvasMesh implements HpGaugeView {
  _modelCache: HpGaugeModel;

  constructor(resources: Resources) {
    super({
      resources,
      meshWidth: 300,
      meshHeight: 300,
      canvasWidth: 256,
      canvasHeight: 256,
    });
    this._modelCache = {
      hp: 0,
      maxHp: 0
    };
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: HpGaugeModel): void {
    if(this._isChanged(this._modelCache, model)) {
      this._refreshGauge(model);
    }
    this._modelCache = model;
    this._refreshPos();
  }

  /**
   * モデルが変更されたか否かを判定する
   *
   * @param model 更新前のモデル
   * @param newModel 更新されたモデル
   * @return 判定結果、trueで変更された
   */
  _isChanged(model: HpGaugeModel, newModel: HpGaugeModel): boolean {
    return model.hp !== newModel.hp || model.maxHp !== newModel.maxHp;
  }

  /**
   * ゲージを更新する
   *
   * @param model HPゲージモデル
   */
  _refreshGauge(model: HpGaugeModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      drawEnemyHpGauge(context, this.resources, context.canvas.width/2, 32, model.hp, model.maxHp);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    //this.mesh.position.x = this.meshWidth / 2;
    this.mesh.position.x = (-window.innerWidth + this.meshWidth) / 2;
    this.mesh.position.y = (window.innerHeight - this.meshHeight) / 2;
  }
}