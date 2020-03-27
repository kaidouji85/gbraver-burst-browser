// @flow

import type {Resources} from "../../../resource";
import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import type {LightningDozerModel} from "./model/lightning-dozer-model";
import {createInitialValue} from "./model/initial-value";
import type {LightningDozerView} from "./view/lightning-dozer-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {charge} from "./animation/charge";
import {armHammer} from "./animation/arm-hammer";
import {hmToStand} from "./animation/hm-to-stand";

/**
 *　ライトニングドーザ
 */
export class LightningDozer implements ArmDozerSprite {
  _model: LightningDozerModel;
  _view: LightningDozerView;
  _subscription: Subscription;

  constructor(resources: Resources, listener: Observable<GameObjectAction>, view: LightningDozerView) {
    this._model = createInitialValue();
    this._view = view;

    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      } else if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor() {
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
   * チャージ
   *
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this._model);
  }

  /**
   * アームハンマー
   *
   * @return アニメーション
   */
  armHammer(): Animate {
    return armHammer(this._model);
  }

  /**
   * アームハンマー -> 立ち
   *
   * @return アニメーション
   */
  hmToStand(): Animate {
    return hmToStand(this._model);
  }

  /** ターンスタート */
  turnStart(): Animate {
    return empty();
  }

  /** ターンスタート -> 立ち */
  turnStartToStand(): Animate {
    return empty();
  }

  /** ノックバック */
  knockBack(): Animate {
    return empty();
  }

  /** ノックバック -> 立ちポーズ */
  knockBackToStand(): Animate {
    return empty();
  }

  /** ガード */
  guard(): Animate {
    return empty();
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return empty();
  }

  /** 避け */
  avoid(): Animate {
    return empty();
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return empty();
  }

  /** ダウン */
  down(): Animate {
    return empty();
  }

  /**
   * アップデート
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }

  /**
   * プリレンダー
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}