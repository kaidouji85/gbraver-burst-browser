// @flow

import type {Resources} from "../../../resource";
import * as THREE from "three";
import type {WingDozerCutInModel} from "./model/wing-dozer-cutin-model";
import type {WingDozerCutInView} from "./view/wing-dozer-cutin-view";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/**
 * ウィングドーザ カットイン
 */
export class WingDozerCutIn {
  _model: WingDozerCutInModel;
  _view: WingDozerCutInView;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listener イベントリスナ
   */
  constructor(view: WingDozerCutInView, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
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
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }
}