// @flow

import * as THREE from 'three';
import type {AttackerIndicatorView} from "./view/attacker-indicator-view";
import type {AttackerIndicatorModel} from "./model/attacker-indicator-model";
import type {GameObjectAction} from "../../action/game-object-action";
import {Observable} from "rxjs";
import {createInitialValue} from "./model/initial-value";

/** アタッカーインジケータ */
export class AttackerIndicator {
  _model: AttackerIndicatorModel;
  _view: AttackerIndicatorView;

  constructor(view: AttackerIndicatorView, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
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