// @flow
import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TimeScaleButtonModel} from "./model/time-scale-button-model";
import {TimeScaleButtonView} from "./view/time-scale-button-view";
import {createInitialValue} from "./model/initial-value";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";

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
    this._view = new TimeScaleButtonView(resources);
    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender();
      }
    });
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
   * プリレンダー時の処理
   */
  _onPreRender(): void {
    this._view.engage(this._model);
  }
}