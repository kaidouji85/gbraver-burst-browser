// @flow

import * as THREE from 'three';
import type {GaugeView} from "./view/gauge-view";
import type {GaugeModel} from "./model/gauge-model";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {PreRender} from "../../action/game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {hp} from "./animation/hp";
import {battery} from './animation/battery';
import {initialValue} from "./model/initial-value";
import type {HUDTracking} from "../../tracking/hud-tracking";

type Param = {
  listener: Observable<GameObjectAction>,
  view: GaugeView,
  hp: number,
  battery: number
};

/** ゲージ */
export class Gauge implements HUDTracking {
  _model: GaugeModel;
  _view: GaugeView;
  _subscription: Subscription;

  constructor(param: Param) {
    this._view = param.view;
    this._model = initialValue(param.hp, param.battery);

    this._subscription = param.listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /** HP変更 */
  hp(value: number): Animate {
    return hp(this._model, value);
  }

  /** バッテリー変更 */
  battery(value: number): Animate {
    return battery(this._model, value);
  }

  /**
   * 3Dレイヤーのオブジェクをトラッキングする
   * 座標にはHUDレイヤー系座標に変換したものを指定する
   *
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void {
    this._model.tracking.x = x;
    this._model.tracking.y = y;
  }

  /** ゲージで使われているthree.jsオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }
}
