// @flow

import * as THREE from 'three';
import type {GaugeView} from "./gauge-view";
import type {GaugeModel} from "../model/gauge-model";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawGauge} from "../../../canvas/gauge";
import type {Resources} from "../../../resource";
import * as R from 'ramda';
import type {PreRender} from "../../../action/game-loop/pre-render";

export const CANVAS_SIZE = 256;
export const MESH_SIZE = 200;

/** プレイヤーゲージのビュー */
export class PlayerGaugeView implements GaugeView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;
  _lastEngagedModel: ?GaugeModel;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._lastEngagedModel = null;
  }

  /** デストラクタ */
  destructor(): void {
    this._canvasMesh.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: GaugeModel): void {
    if (this._shouldCanvasRefresh(model)) {
      this._refreshCanvas(model);
    }
    this._updateLastEngagedModel(model);
  }

  /** プリレンダー */
  preRender(action: PreRender): void {
    this._setPos(action.rendererDOM);
    this._lookAt(action.camera);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.getObject3D();
  }

  /** 最後にビューに反映されたモデルを、引数の内容で上書きする */
  _updateLastEngagedModel(model: GaugeModel): void {
    this._lastEngagedModel = R.clone(model);
  }

  /** キャンバスを更新するか否かを判定する、trueで更新する */
  _shouldCanvasRefresh(model: GaugeModel): boolean {
    return !R.equals(this._lastEngagedModel, model);
  }

  /** キャンバスを更新する */
  _refreshCanvas(model: GaugeModel): void {
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      drawGauge({
        context: context,
        resources: this._resources,
        dx: CANVAS_SIZE / 2,
        dy: CANVAS_SIZE / 2,
        hp: model.hp,
        maxHp: model.maxHp,
        battery: model.battery,
        maxBattery: model.maxBattery
      });
    });
  }

  /** 座標をセットする */
  _setPos(rendererDOM: HTMLElement): void {
    this._canvasMesh.mesh.position.x = 100;
    this._canvasMesh.mesh.position.y = rendererDOM.clientHeight / 2 - 50;
    this._canvasMesh.mesh.position.z = 0;
  }

  /** カメラの真正面を向く */
  _lookAt(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }
}