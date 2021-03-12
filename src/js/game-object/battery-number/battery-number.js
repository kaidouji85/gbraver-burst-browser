// @flow

import type {BatteryNumberModel} from "./model/battery-number-model";
import type {BatteryNumberView} from "./view/battery-number-view";
import * as THREE from 'three';
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {show} from "./animation/show";
import {hidden} from "./animation/hidden";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

type Param = {
  listener: Stream<GameObjectAction>,
  view: BatteryNumberView
};

/** バッテリー数字 */
export class BatteryNumber {
  _model: BatteryNumberModel;
  _view: BatteryNumberView;
  _unSubscriber: Unsubscriber;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = param.view;
    this._unSubscriber = param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update();
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unSubscriber.unsubscribe();
  }

  /**
   * バッテリー数字を表示する
   *
   * @param battery バッテリー値
   * @return アニメーション
   */
  show(battery: number): Animate {
    return show(this._model, battery);
  }

  /**
   * バッテリー数字を消す
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this._model);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(): void {
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}