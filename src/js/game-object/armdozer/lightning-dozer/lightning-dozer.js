// @flow

import type {Resources} from "../../../resource";
import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
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
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {avoid} from "./animation/avoid";
import {avoidToStand} from "./animation/avoid-to-stand";
import {down} from "./animation/down";
import {turnStart} from "./animation/turn-start";
import {turnStartToStand} from "./animation/turn-start-to-stand";
import {guard} from "./animation/guard";
import {guardToStand} from "./animation/guard-to-stand";
import {LightningDozerSounds} from "./sounds/lightning-dozer-sounds";

/**
 *　ライトニングドーザ
 */
export class LightningDozer implements ArmDozerSprite {
  _model: LightningDozerModel;
  _view: LightningDozerView;
  _sounds: LightningDozerSounds;
  _subscription: Subscription;

  constructor(resources: Resources, listener: Observable<GameObjectAction>, view: LightningDozerView) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new LightningDozerSounds(resources);

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
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void {
    this._view.addObject3D(object);
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
    return hmToStand(this._model, this._sounds);
  }

  /** ターンスタート */
  turnStart(): Animate {
    return turnStart(this._model, this._sounds);
  }

  /** ターンスタート -> 立ち */
  turnStartToStand(): Animate {
    return turnStartToStand(this._model, this._sounds);
  }

  /** ノックバック */
  knockBack(): Animate {
    return knockBack(this._model);
  }

  /** ノックバック -> 立ちポーズ */
  knockBackToStand(): Animate {
    return knockBackToStand(this._model, this._sounds);
  }

  /** ガード */
  guard(): Animate {
    return guard(this._model);
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return guardToStand(this._model, this._sounds);
  }

  /** 避け */
  avoid(): Animate {
    return avoid(this._model, this._sounds);
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return avoidToStand(this._model, this._sounds);
  }

  /** ダウン */
  down(): Animate {
    return down(this._model);
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