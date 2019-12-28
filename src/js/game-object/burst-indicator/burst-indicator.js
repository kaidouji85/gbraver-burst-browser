//@flow

import * as THREE from 'three';
import type {BurstIndicatorModel} from "./model/burst-indicator-model";
import type {BurstIndicatorView} from "./view/burst-indicator-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";

/**
 * バーストインジケータ
 */
export class BurstIndicator {
  _model: BurstIndicatorModel;
  _view:  BurstIndicatorView;
  _subscription: Subscription;

  constructor(view: BurstIndicatorView, listener: Observable<GameObjectAction>) {
    this._model = {}; // TODO 初期化関数を追加する
    this._view = view;
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
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

  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }
}
