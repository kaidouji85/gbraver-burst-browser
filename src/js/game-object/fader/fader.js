// @flow

import * as THREE from 'three';
import {FaderView} from "./view/fader-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {PreRender} from "../../action/game-loop/pre-render";
import type {Update} from "../../action/game-loop/update";

type Param = {
  listener: Observable<GameObjectAction>
};

/** 画面フェーダー */
export class Fader {
  _view: FaderView;
  _subscription: Subscription;

  constructor(param: Param) {
    this._view = new FaderView();
    this._subscription = param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      }else if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
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
   * アップデートの際の処理
   * 
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage();
  }

  /**
   * プリレンダーの際の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.changeScreenSize(action.rendererDOM.clientWidth, action.rendererDOM.clientHeight);
  }
}