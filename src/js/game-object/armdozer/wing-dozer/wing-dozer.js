// @flow

import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import type {WingDozerView} from "./view/wing-dozer-view";
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
import {dash} from "./animation/dash";
import {dashToStand} from "./animation/dash-to-stand";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {down} from "./animation/down";
import {WingDozerSounds} from "./sounds/wing-dozer-sounds";
import type {Resources} from "../../../resource";
import {guard} from "./animation/guard";
import {guardToStand} from "./animation/guard-to-stand";
import type {PreRender} from "../../../action/game-loop/pre-render";

/**
 * ウィングドーザ
 */
export class WingDozer implements ArmDozerSprite {
  _model: WingDozerModel;
  _view: WingDozerView;
  _sounds: WingDozerSounds;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param listener イベントリスト
   */
  constructor(view: WingDozerView, resources: Resources, listener: Observable<GameObjectAction>): void {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new WingDozerSounds(resources);
    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate(action);
      } else if (action.type === 'PreRender') {
        this._onPreRender(action);
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
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this._view.addObject3D(object);
  }

  /**
   * ターンスタート
   *
   * @return アニメーション
   */
  turnStart(): Animate {
    return dash(this._model, this._sounds);
  }

  /**
   * ターンスタート -> 立ち
   *
   * @return アニメーション
   */
  turnStartToStand(): Animate {
    return dashToStand(this._model, this._sounds);
  }

  /**
   * ノックバック
   *
   * @return アニメーション
   */
  knockBack(): Animate {
    return knockBack(this._model);
  }

  /**
   * ノックバック -> 立ちポーズ
   *
   * @return アニメーション
   */
  knockBackToStand(): Animate {
    return knockBackToStand(this._model, this._sounds);
  }

  /**
   * ガード
   *
   * @return アニメーション
   */
  guard(): Animate {
    return guard(this._model);
  }

  /** 
   * ガード -> 立ちポーズ
   *
   * @return アニメーション
   */
  guardToStand(): Animate {
    return guardToStand(this._model, this._sounds);
  }

  /**
   * 避け
   *
   * @return アニメーション
   */
  avoid(): Animate {
    return avoid(this._model, this._sounds);
  }

  /**
   * 避け -> 立ち
   *
   * @return アニメーション
   */
  avoidToStand(): Animate {
    return avoidToStand(this._model, this._sounds);
  }

  /**
   * ダウン
   *
   * @return アニメーション
   */
  down(): Animate {
    return down(this._model);
  }

  /**
   * チャージ
   *
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this._model, this._sounds);
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
    return upperToStand(this._model, this._sounds);
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._view.engage(this._model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}
