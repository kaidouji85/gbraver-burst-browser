// @flow

import {ArmDozerSprite} from '../common/armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {TweenAnimation} from "../../../animation/tween-animation";
import {empty} from "../../../animation/delay";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;

  constructor(params: { view: NeoLandozerView, listener: Observable<GameObjectAction> }) {
    this._model = createInitialValue();
    this._view = params.view;

    params.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** 立ち状態にする */
  stand(): TweenAnimation {
    return stand(this._model);
  }

  /** 敵との距離を詰める */
  frontStep(): TweenAnimation {
    return empty();
  }

  /** 敵との距離を離す */
  backStep(): TweenAnimation {
    return empty();
  }

  /** パンチアニメーションを再生する */
  punch(): TweenAnimation {
    // TODO アニメーションを作る
    return empty();
  }

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number {
    return 1000;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** レンダリング直前の処理 */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}