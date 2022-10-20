// @flow

import * as THREE from "three";
import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmDozerSprite } from "../armdozer-sprite";
import { armHammer } from "./animation/arm-hammer";
import { avoid } from "./animation/avoid";
import { charge } from "./animation/charge";
import { down } from "./animation/down";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { guts } from "./animation/guts";
import { gutsToStand } from "./animation/guts-to-stand";
import { hmToStand } from "./animation/hm-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { createInitialValue } from "./model/initial-value";
import type { LightningDozerModel } from "./model/lightning-dozer-model";
import { LightningDozerSounds } from "./sounds/lightning-dozer-sounds";
import type { LightningDozerView } from "./view/lightning-dozer-view";

/**
 * ライトニングドーザ
 */
export class LightningDozer implements ArmDozerSprite {
  #model: LightningDozerModel;
  #view: LightningDozerView;
  #sounds: LightningDozerSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param view ビュー
   */
  constructor(
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>,
    view: LightningDozerView
  ) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new LightningDozerSounds(resources);

    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      } else if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#view.addObject3D(object);
  }

  /**
   * チャージ
   *
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#model, this.#sounds);
  }

  /**
   * アームハンマー
   *
   * @return アニメーション
   */
  armHammer(): Animate {
    return armHammer(this.#model);
  }

  /**
   * アームハンマー -> 立ち
   *
   * @return アニメーション
   */
  hmToStand(): Animate {
    return hmToStand(this.#model, this.#sounds);
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

  /** ノックバック */
  knockBack(): Animate {
    return knockBack(this.#model);
  }

  /** ノックバック -> 立ちポーズ */
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
   * アップデート
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダー
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
