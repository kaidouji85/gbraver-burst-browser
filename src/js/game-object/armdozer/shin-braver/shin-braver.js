// @flow

import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverView} from "./view/shin-braver-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {straightPunch} from "./animation/straight-punch";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {avoid} from "./animation/avoid";
import {guard} from "./animation/guard";
import {guardToStand} from "./animation/guard-to-stand";
import {avoidToStand} from "./animation/avoid-to-stand";
import {punchToStand} from "./animation/punch-to-stand";
import {charge} from "./animation/charge";
import {down} from "./animation/down";
import {turnStart} from "./animation/turn-start";
import {turnStartToStand} from "./animation/turn-start-to-stand";
import {burst} from "./animation/burst";
import {burstToStand} from "./animation/burst-to-stand";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;
  _subscription: Subscription;

  constructor(params: { view: ShinBraverView, listener: Observable<GameObjectAction> }) {
    this._model = createInitialValue();
    this._view = params.view;

    this._subscription = params.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void {
    this._view.addObject3D(object);
  }

  /** チャージ */
  charge(): Animate {
    return charge(this._model);
  }

  /** ストレートパンチ */
  straightPunch(): Animate {
    return straightPunch(this._model);
  }

  /** パンチ -> 立ち */
  punchToStand(): Animate {
    return punchToStand(this._model);
  }

  /** ターンスタート */
  turnStart(): Animate {
    return turnStart(this._model);
  }

  /** ターンスタート -> 立ち */
  turnStartToStand(): Animate {
    return turnStartToStand(this._model);
  }

  /** ダメージアニメーションを再生する */
  knockBack(): Animate {
    return knockBack(this._model);
  }

  /** ノックバック -> 立ち */
  knockBackToStand(): Animate {
    return knockBackToStand(this._model);
  }

  /** ガード */
  guard(): Animate {
    return guard(this._model);
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return guardToStand(this._model);
  }

  /** 避け */
  avoid(): Animate {
    return avoid(this._model);
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return avoidToStand(this._model);
  }

  /** ダウン */
  down(): Animate {
    return down(this._model);
  }

  /**
   * バースト
   *
   * @return アニメーション
   */
  burst(): Animate {
    return burst(this._model);
  }

  /**
   * バースト -> 立ち
   *
   * @return アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this._model);
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