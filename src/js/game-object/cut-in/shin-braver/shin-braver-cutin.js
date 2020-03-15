// @flow

import * as THREE from 'three';
import type {CutIn} from "../cut-in";
import type {Resources} from "../../../resource";
import type {ShinBraverCutInModel} from "./model/shin-braver-cutin-model";
import {ShinBraverCutInView} from "./view/shin-braver-cutin-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";

/** メッシュの大きさ */
export const MESH_SIZE = 200;

/**
 * シンブレイバーカットイン
 */
export class ShinBraverCutIn implements CutIn {
  _model: ShinBraverCutInModel;
  _view: ShinBraverCutInView;
  _subscription: Subscription;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new ShinBraverCutInView(resources);
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