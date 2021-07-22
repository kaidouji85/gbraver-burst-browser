// @flow

import * as THREE from "three";
import type {BatteryCorrectModel} from "./model/battery-correct-model";
import type {BatteryCorrectView} from "./view/battery-correct-view";
import {initialValue} from "./model/initial-value";
import type {Stream, Unsubscriber} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {popUp} from './animation/pop-up';

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
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
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
   * ポップアップ表示
   *
   * @param value 補正値
   * @return アニメーション
   */
  popUp(value: number): Animate {
    return popUp(this._model, value);
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