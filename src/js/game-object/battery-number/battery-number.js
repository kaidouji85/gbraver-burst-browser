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
import {change} from "./animation/change";

/** バッテリー数字 */
export class BatteryNumber {
  _model: BatteryNumberModel;
  _view: BatteryNumberView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: BatteryNumberView, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._unsubscriber = gameObjectAction.subscribe(action => {
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
    this._unsubscriber.unsubscribe();
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
   * 数字を変更する
   *
   * @param battery 変更する値
   * @return アニメーション
   */
  change(battery: number): Animate {
    return change(this._model, battery);
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