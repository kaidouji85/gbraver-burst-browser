// @flow

import type {Resources} from "../../../resource";
import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import type {LightningDozerModel} from "./model/lightning-dozer-model";
import {createInitialValue} from "./model/initial-value";
import type {LightningDozerView} from "./view/lightning-dozer-view";
import type {PreRender} from "../../../game-loop/pre-render";
import {charge} from "./animation/charge";
import {armHammer} from "./animation/arm-hammer";
import {hmToStand} from "./animation/hm-to-stand";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {avoid} from "./animation/avoid";
import {avoidToStand} from "./animation/avoid-to-stand";
import {down} from "./animation/down";
import {guts} from "./animation/guts";
import {gutsToStand} from "./animation/guts-to-stand";
import {guard} from "./animation/guard";
import {guardToStand} from "./animation/guard-to-stand";
import {LightningDozerSounds} from "./sounds/lightning-dozer-sounds";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, Unsubscriber} from "../../../stream/core";

/**
 * ライトニングドーザ
 */
export class LightningDozer implements ArmDozerSprite {
  _model: LightningDozerModel;
  _view: LightningDozerView;
  _sounds: LightningDozerSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param view ビュー
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>, view: LightningDozerView) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new LightningDozerSounds(resources);

    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      } else if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
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

  /**
   * ガッツ
   * 
   * @return アニメーション
   */
  guts(): Animate {
    return guts(this._model, this._sounds);
  }

  /**
   * ガッツ -> 立ち
   *
   * @return アニメーション
   */
  gutsToStand(): Animate {
    return gutsToStand(this._model, this._sounds);
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
   */
  _onUpdate(): void {
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