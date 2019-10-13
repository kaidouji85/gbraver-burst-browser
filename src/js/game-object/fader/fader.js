/// @flow

import * as THREE from 'three';
import {FaderView} from "./view/fader-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

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
}