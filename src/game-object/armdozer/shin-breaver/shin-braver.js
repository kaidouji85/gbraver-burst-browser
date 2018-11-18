// @flow

import {ArmDozerSprite} from '../common/armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverView} from "./view/shin-braver-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {punch} from "./animation/punch";
import {TweenAnimation} from "../../../animation/tween-animation";
import {frontStep} from "./animation/front-step";
import {backStep} from "./animation/back-step";
import {empty} from "../../../animation/delay";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;

  constructor(params: { view: ShinBraverView, listener: Observable<GameObjectAction> }) {
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

  /** 立ちポーズにする */
  stand(): TweenAnimation {
    return stand(this._model);
  }

  /** 敵との距離を詰める */
  frontStep(): TweenAnimation {
    return frontStep(this._model);
  }

  /** 敵との距離を離す */
  backStep(): TweenAnimation {
    return backStep(this._model);
  }

  /** パンチアニメーションを再生する */
  punch(): TweenAnimation {
    return punch(this._model);
  }

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number {
    return 1600;
  }

  /** ダメージアニメーションを再生する */
  knockBack(): TweenAnimation {
    return empty();
  }

  /** ノックバックから立ちに戻る */
  recoverKnockBack(): TweenAnimation {
    return empty();
  }

  /** シーンに追加するオブジェクトを返す */
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