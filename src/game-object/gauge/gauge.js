// @flow

import * as THREE from 'three';
import type {GaugeView} from "./view/gauge-view";
import type {GaugeModel} from "./model/gauge-model";
import {Group, Tween} from '@tweenjs/tween.js';
import {refresh} from "./animation/regresh";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

type Param = {
  listener: Observable<GameObjectAction>,
  view: GaugeView,
  hp: number,
  battery: number
};

/** ゲージ */
export class Gauge {
  _model: GaugeModel;
  _view: GaugeView;
  _tween: Group;

  constructor(param: Param) {
    this._view = param.view;
    this._model = {
      hp: param.hp,
      maxHp: param.hp,
      battery: param.battery,
      maxBattery: param.battery
    };
    this._tween = new Group();

    param.listener.subscribe(action => {
      switch (action.type) {
        case 'GameLoop':
          this._gameLoop(action);
          return;
        default:
          return;
      }
    });
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }

  /** ゲージ内容更新 */
  refresh(hp: number, battery: number): Tween {
    return refresh(this._model, this._tween, hp, battery);
  }

  /** ゲージで使われているthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}
