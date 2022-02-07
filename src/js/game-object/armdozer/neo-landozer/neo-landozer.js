// @flow

import type {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../../game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {guard} from './animation/guard';
import {guardToStand} from './animation/guard-to-stand';
import {avoid} from "./animation/avoid";
import {armHammer} from "./animation/arm-hammer";
import {avoidToStand} from "./animation/avoid-to-stand";
import {charge} from "./animation/charge";
import {hmToStand} from "./animation/hm-to-stand";
import {down} from "./animation/down";
import {guts} from "./animation/guts";
import {gutsToStand} from "./animation/guts-to-stand";
import type {Resources} from "../../../resource";
import {NeoLandozerSounds} from "./sounds/neo-landozer-sounds";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, Unsubscriber} from "../../../stream/core";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;
  _sounds: NeoLandozerSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: NeoLandozerView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new NeoLandozerSounds(resources);

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

  /** チャージ */
  charge(): Animate {
    return charge(this._model, this._sounds);
  }

  /** アームハンマー */
  armHammer(): Animate {
    return armHammer(this._model);
  }

  /** アームハンマー -> 立ち */
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

  /** ノックバック -> 立ち*/
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

  /** シーンに追加するオブジェクトを取得する */
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