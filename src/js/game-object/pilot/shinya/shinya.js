// @flow

import * as THREE from 'three';
import type {ShinyaModel} from "./model/shinya-model";
import {ShinyaView} from "./view/shinya-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {PreRender} from "../../../action/game-loop/pre-render";

/**
 * シンヤ カットイン
 */
export class Shinya {
  _model: ShinyaModel;
  _view: ShinyaView;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listener イベントリスナ
   */
  constructor(view: ShinyaView, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._subscription = listener.subscribe(action => {
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
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.engage(this._model);
  }
}