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
import type { NeoLandozerModel } from "./model/neo-landozer-model";
import { NeoLandozerSounds } from "./sounds/neo-landozer-sounds";
import type { NeoLandozerView } from "./view/neo-landozer-view";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer extends EmptyArmDozerSprite implements ArmDozerSprite {
  #model: NeoLandozerModel;
  #view: NeoLandozerView;
  #sounds: NeoLandozerSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: NeoLandozerView,
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>
  ) {
    super();
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new NeoLandozerSounds(resources);

    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#update();
      } else if (action.type === "PreRender") {
        this.#preRender(action);
      }
    });
  }

  /** @overview */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /** @overview */
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

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * Update時の処理
   */
  #update(): void {
    this.#view.engage(this.#model);
  }

  /**
   * PreRender時の処理
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
