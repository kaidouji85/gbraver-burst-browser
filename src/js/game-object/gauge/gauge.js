// @flow

import * as THREE from 'three';
import type {GaugeView} from "./view/gauge-view";
import type {GaugeModel} from "./model/gauge-model";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {hp} from "./animation/hp";
import {battery} from './animation/battery';
import {initialValue} from "./model/initial-value";
import type {HUDTracking} from "../../tracking/hud-tracking";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/** コンストラクタのパラメータ */
type Param = {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** ビュー */
  view: GaugeView,
  /** 最大HP */
  hp: number,
  /** 最大バッテリー */
  battery: number
};

/** ゲージ */
export class Gauge implements HUDTracking {
  _model: GaugeModel;
  _view: GaugeView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._view = param.view;
    this._model = initialValue(param.hp, param.battery);

    this._unsubscriber = param.gameObjectAction.subscribe(action => {
      if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
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
