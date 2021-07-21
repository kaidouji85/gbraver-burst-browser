// @flow

import * as THREE from "three";
import type {BatteryCorrectModel} from "./model/battery-correct-model";
import type {BatteryCorrectView} from "./view/battery-correct-view";
import {initialValue} from "./model/initial-value";
import type {Stream, Unsubscriber} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {show} from "./animation/show";
import {hidden} from './animation/hidden';

/** バッテリー補正 */
export class BatteryCorrect {
  _model: BatteryCorrectModel;
  _view: BatteryCorrectView;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listener イベントリスナ
   */
  constructor(view: BatteryCorrectView, listener: Stream<GameObjectAction>) {
    this._model = initialValue();
    this._view = view;
    this._unsubscribers = [
      listener.subscribe(action => {
        if (action.type === 'PreRender') { this._onPreRender(action) }
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * バッテリー補正を表示する
   *
   * @param correctValue 補正値
   * @return アニメーション
   */
  show(correctValue: number): Animate {
    return show(this._model, correctValue);
  }

  /**
   * 非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this._model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action プリレンダー情報
   */
  _onPreRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }
}