// @flow
import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TimeScaleButtonModel} from "./model/time-scale-button-model";
import {TimeScaleButtonView} from "./view/time-scale-button-view";
import {createInitialValue} from "./model/initial-value";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";
import type { Animate } from "../../animation/animate";
import { toggle } from "./animation/toggle";

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  _model: TimeScaleButtonModel;
  _view: TimeScaleButtonView;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new TimeScaleButtonView(resources, gameObjectAction);
    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
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
   * ボタン押下通知
   * 
   * @return 通知ストリーム
   */
  pushNotifier(): Stream<void> {
    return this._view.pushButtonNotifier();
  }

  /**
   * タイムスケールを切り替える
   * 
   * @return アニメーション
   */
  toggle(): Animate {
    return toggle(this._model, 0.5);  // TODO 現在値に応じて次の値を設定する
  }

  /**
   * プリレンダー時の処理
   *
   * @param preRender プリレンダー
   */
  _onPreRender(preRender: PreRender): void {
    this._view.engage(this._model, preRender);
  }
}