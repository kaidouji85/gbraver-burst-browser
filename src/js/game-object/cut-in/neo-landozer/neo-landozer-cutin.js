// @flow

import * as THREE from "three";
import type {NeoLandozerCutInView} from "./view/neo-landozer-cutin-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {NeoLandozerCutInModel} from "./model/neo-landozer-cutin-model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";


/**
 * ネオランドーザ カットイン
 */
export class NeoLandozerCutIn {
  _model: NeoLandozerCutInModel;
  _view: NeoLandozerCutInView;
  _subscription: Subscription;
  
  constructor(view: NeoLandozerCutInView, listener: Observable<GameObjectAction>) {
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