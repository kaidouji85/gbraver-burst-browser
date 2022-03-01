// @flow

import type {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverView} from "./view/shin-braver-view";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../../game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {straightPunch} from "./animation/straight-punch";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {avoid} from "./animation/avoid";
import {guard} from "./animation/guard";
import {guardToStand} from "./animation/guard-to-stand";
import {frontStep} from "./animation/front-step";
import {punchToStand} from "./animation/punch-to-stand";
import {charge} from "./animation/charge";
import {down} from "./animation/down";
import {guts} from "./animation/guts";
import {gutsToStand} from "./animation/guts-to-stand";
import {burst} from "./animation/burst";
import {burstToStand} from "./animation/burst-to-stand";
import type {Resources} from "../../../resource";
import {ShinBraverSounds} from "./sounds/shin-braver-sounds";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, Unsubscriber} from "../../../stream/core";
import {ARMDOZER_SPRITE_STANDARD_X, ARMDOZER_SPRITE_STANDARD_Y, ARMDOZER_SPRITE_STANDARD_Z} from "../position";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;
  _sounds: ShinBraverSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: ShinBraverView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new ShinBraverSounds(resources);
    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this._update();
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this._view.addObject3D(object);
  }

  /** @override */
  setFirstAttackerPosition(): void {
    this._model.position.x = ARMDOZER_SPRITE_STANDARD_X + 50;
    this._model.position.y = ARMDOZER_SPRITE_STANDARD_Y;
    this._model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
  }

  /** @override */
  setSecondAttackerPosition(): void {
    this._model.position.x = ARMDOZER_SPRITE_STANDARD_X;
    this._model.position.y = ARMDOZER_SPRITE_STANDARD_Y;
    this._model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
  }

  /** @override */
  firstAttackerMotion(): Animate {
    return frontStep(this._model, this._sounds, 50);
  }

  /** チャージ */
  charge(): Animate {
    return charge(this._model, this._sounds);
  }

  /** ストレートパンチ */
  straightPunch(): Animate {
    return straightPunch(this._model);
  }

  /** パンチ -> 立ち */
  punchToStand(): Animate {
    return punchToStand(this._model, this._sounds);
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

  /** ダメージアニメーションを再生する */
  knockBack(): Animate {
    return knockBack(this._model);
  }

  /** ノックバック -> 立ち */
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
    return frontStep(this._model, this._sounds);
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
    return burst(this._model, this._sounds);
  }

  /**
   * バースト -> 立ち
   *
   * @return アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this._model, this._sounds);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(): void {
    this._view.engage(this._model);
  }

  /** レンダリング直前の処理 */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}