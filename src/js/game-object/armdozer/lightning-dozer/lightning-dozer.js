// @flow

import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmDozerSprite } from "../armdozer-sprite";
import { EmptyArmDozerSprite } from "../empty-armdozer-sprite";
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

/** ライトニングドーザ */
export class LightningDozer
  extends EmptyArmDozerSprite
  implements ArmDozerSprite
{
  #model: LightningDozerModel;
  #view: LightningDozerView;
  #sounds: LightningDozerSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param view ビュー
   */
  constructor(
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>,
    view: LightningDozerView
  ) {
    super();
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

  /** @override */
  destructor() {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#view.addObject3D(object);
  }

  /**
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#model, this.#sounds);
  }

  /**
   * アームハンマー
   * @return アニメーション
   */
  armHammer(): Animate {
    return armHammer(this.#model);
  }

  /**
   * アームハンマー -> 立ち
   * @return アニメーション
   */
  hmToStand(): Animate {
    return hmToStand(this.#model, this.#sounds);
  }

  /**
   * ガッツ
   * @return アニメーション
   */
  guts(): Animate {
    return guts(this.#model, this.#sounds);
  }

  /**
   * ガッツ -> 立ち
   * @return アニメーション
   */
  gutsToStand(): Animate {
    return gutsToStand(this.#model, this.#sounds);
  }

  /** @override */
  knockBack(): Animate {
    return knockBack(this.#model);
  }

  /** @override */
  knockBackToStand(): Animate {
    return knockBackToStand(this.#model, this.#sounds);
  }

  /** @override */
  guard(): Animate {
    return guard(this.#model);
  }

  /** @override */
  guardToStand(): Animate {
    return guardToStand(this.#model, this.#sounds);
  }

  /** @override */
  avoid(): Animate {
    return avoid(this.#model, this.#sounds);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#model, this.#sounds);
  }

  /** @override */
  down(): Animate {
    return down(this.#model);
  }

  /**
   * Update時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

  /**
   * PreRender時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
