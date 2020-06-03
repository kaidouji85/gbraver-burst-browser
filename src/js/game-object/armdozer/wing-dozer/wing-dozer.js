// @flow

import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import type {Resources} from "../../../resource";
import type {WingDozerView} from "./view/wing-dozer-view";
import {PlayerWingDozerView} from "./view/player-wing-dozer-view";
import type {WingDozerModel} from "./model/wing-dozer-model";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";
import {charge} from "./animation/charge";
import {upper} from "./animation/upper";
import {upperToStand} from "./animation/upper-to-stand";
import {avoid} from "./animation/avoid";
import {avoidToStand} from "./animation/avoid-to-stand";

/**
 * ウィングドーザ
 */
export class WingDozer implements ArmDozerSprite {
  _model: WingDozerModel;
  _view: WingDozerView;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param listenr イベントリスト
   */
  constructor(view: WingDozerView, listenr: Observable<GameObjectAction>): void {
    this._model = createInitialValue();
    this._view = view;
    this._subscription = listenr.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      }
    });
  }

  /**
   * デストラクタ
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
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void {
    // NOP
  }

  /**
   * ターンスタート
   *
   * @return アニメーション
   */
  turnStart(): Animate {
    return empty();
  }

  /**
   * ターンスタート -> 立ち
   *
   * @return アニメーション
   */
  turnStartToStand(): Animate {
    return empty();
  }

  /**
   * ノックバック
   *
   * @return アニメーション
   */
  knockBack(): Animate {
    return empty();
  }

  /**
   * ノックバック -> 立ちポーズ
   *
   * @return アニメーション
   */
  knockBackToStand(): Animate {
    return empty();
  }

  /**
   * ガード
   *
   * @return アニメーション
   */
  guard(): Animate {
    return empty();
  }

  /** 
   * ガード -> 立ちポーズ
   *
   * @return アニメーション
   */
  guardToStand(): Animate {
    return empty();
  }

  /**
   * 避け
   *
   * @return アニメーション
   */
  avoid(): Animate {
    return avoid(this._model);
  }

  /**
   * 避け -> 立ち
   *
   * @return アニメーション
   */
  avoidToStand(): Animate {
    return avoidToStand(this._model);
  }

  /**
   * ダウン
   *
   * @return アニメーション
   */
  down(): Animate {
    return empty();
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
   * アッパー
   *
   * @return アニメーション
   */
  upper(): Animate {
    return upper(this._model);
  }

  /**
   * アッパー -> 立ち
   *
   * @return アニメーション
   */
  upperToStand(): Animate {
    return upperToStand(this._model);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }
}
