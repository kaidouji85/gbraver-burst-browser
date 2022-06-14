// @flow

import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import type {PreRender} from "../../../game-loop/pre-render";
import type {Resources} from "../../../resource";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GameObjectAction} from "../../action/game-object-action";
import type {ArmDozerSprite} from '../armdozer-sprite';
import {avoid} from "./animation/avoid";
import {burst} from "./animation/burst";
import {burstToStand} from "./animation/burst-to-stand";
import {charge} from "./animation/charge";
import {down} from "./animation/down";
import {frontStep} from "./animation/front-step";
import {guard} from "./animation/guard";
import {guardToStand} from "./animation/guard-to-stand";
import {guts} from "./animation/guts";
import {gutsToStand} from "./animation/guts-to-stand";
import {knockBack} from "./animation/knock-back";
import {knockBackToStand} from "./animation/knock-back-to-stand";
import {punchToStand} from "./animation/punch-to-stand";
import {straightPunch} from "./animation/straight-punch";
import {createInitialValue} from "./model/initial-value";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {ShinBraverSounds} from "./sounds/shin-braver-sounds";
import type {ShinBraverView} from "./view/shin-braver-view";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  #model: ShinBraverModel;
  #view: ShinBraverView;
  #sounds: ShinBraverSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: ShinBraverView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new ShinBraverSounds(resources);
    this.#unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this.#update();
      } else if (action.type === 'PreRender') {
        this.#preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#view.addObject3D(object);
  }

  /** チャージ */
  charge(): Animate {
    return charge(this.#model, this.#sounds);
  }

  /** ストレートパンチ */
  straightPunch(): Animate {
    return straightPunch(this.#model);
  }

  /** パンチ -> 立ち */
  punchToStand(): Animate {
    return punchToStand(this.#model, this.#sounds);
  }

  /**
   * ガッツ
   *
   * @return アニメーション
   */
  guts(): Animate {
    return guts(this.#model, this.#sounds);
  }

  /**
   * ガッツ -> 立ち
   *
   * @return アニメーション
   */
  gutsToStand(): Animate {
    return gutsToStand(this.#model, this.#sounds);
  }

  /** ダメージアニメーションを再生する */
  knockBack(): Animate {
    return knockBack(this.#model);
  }

  /** ノックバック -> 立ち */
  knockBackToStand(): Animate {
    return knockBackToStand(this.#model, this.#sounds);
  }

  /** ガード */
  guard(): Animate {
    return guard(this.#model);
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return guardToStand(this.#model, this.#sounds);
  }

  /** 避け */
  avoid(): Animate {
    return avoid(this.#model, this.#sounds);
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return frontStep(this.#model, this.#sounds);
  }

  /** ダウン */
  down(): Animate {
    return down(this.#model);
  }

  /**
   * バースト
   *
   * @return アニメーション
   */
  burst(): Animate {
    return burst(this.#model, this.#sounds);
  }

  /**
   * バースト -> 立ち
   *
   * @return アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this.#model, this.#sounds);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /** 状態更新 */
  #update(): void {
    this.#view.engage(this.#model);
  }

  /** レンダリング直前の処理 */
  #preRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}