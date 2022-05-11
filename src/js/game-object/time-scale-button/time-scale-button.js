// @flow
import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TimeScaleButtonModel} from "./model/time-scale-button-model";
import {TimeScaleButtonView} from "./view/time-scale-button-view";
import {createInitialValue} from "./model/initial-value";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import type {PreRender} from "../../game-loop/pre-render";

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  _model: TimeScaleButtonModel;
  _view: TimeScaleButtonView;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new TimeScaleButtonView(resources, gameObjectAction);
    this._unsubscribers = [
      gameObjectAction.subscribe(action => {
        if (action.type === 'PreRender') {
          this._onPreRender(action);
        }
      }),
      this._view.pushButtonNotifier().subscribe(() => {
        this._onButtonPush();
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
   * プリレンダー時の処理
   *
   * @param preRender プリレンダー
   */
  _onPreRender(preRender: PreRender): void {
    this._view.engage(this._model, preRender);
  }

  /**
   * ボタン押下時の処理
   */
  _onButtonPush(): void {
    console.log('push');
  }
}