import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { armHammer } from "./animation/arm-hammer";
import { avoid } from "./animation/avoid";
import { bowDown } from "./animation/bow-down";
import { bowUp } from "./animation/bow-up";
import { charge } from "./animation/charge";
import { down } from "./animation/down";
import { endActive } from "./animation/end-active";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { guts } from "./animation/guts";
import { gutsToStand } from "./animation/guts-to-stand";
import { hmToStand } from "./animation/hm-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { startActive } from "./animation/start-active";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createLightningDozerProps,
  GenerateLightningDozerPropsParams,
} from "./props/create-lightning-dozer-props";
import { LightningDozerProps } from "./props/lightning-dozer-props";

type Params = GenerateLightningDozerPropsParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ライトニングドーザ */
export class LightningDozer
  extends EmptyArmdozerSprite
  implements ArmdozerSprite
{
  /** プロパティ */
  #props: LightningDozerProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    super();
    const { gameObjectAction } = params;
    this.#props = createLightningDozerProps(params);
    this.#unsubscribers = bindEventListeners({
      props: this.#props,
      gameObjectAction,
    });
  }

  /** @override */
  destructor() {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#props.view.addObject3D(object);
  }

  /** @override */
  startActive(): Animate {
    return startActive(this.#props);
  }

  /** @override */
  endActive(): Animate {
    return endActive(this.#props);
  }

  /**
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#props);
  }

  /**
   * アームハンマー
   * @return アニメーション
   */
  armHammer(): Animate {
    return armHammer(this.#props);
  }

  /**
   * アームハンマー -> 立ち
   * @return アニメーション
   */
  hmToStand(): Animate {
    return hmToStand(this.#props);
  }

  /**
   * ガッツ
   * @return アニメーション
   */
  guts(): Animate {
    return guts(this.#props);
  }

  /**
   * ガッツ -> 立ち
   * @return アニメーション
   */
  gutsToStand(): Animate {
    return gutsToStand(this.#props);
  }

  /** @override */
  knockBack(): Animate {
    return knockBack(this.#props);
  }

  /** @override */
  knockBackToStand(): Animate {
    return knockBackToStand(this.#props);
  }

  /** @override */
  guard(): Animate {
    return guard(this.#props);
  }

  /** @override */
  guardToStand(): Animate {
    return guardToStand(this.#props);
  }

  /** @override */
  avoid(): Animate {
    return avoid(this.#props);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#props);
  }

  /** @override */
  down(): Animate {
    return down(this.#props);
  }

  /** @override */
  upright(): Animate {
    return upright(this.#props);
  }

  /** @override */
  uprightToStand(): Animate {
    return uprightToStand(this.#props);
  }

  /** @override */
  bowDown(): Animate {
    return bowDown(this.#props);
  }

  /** @override */
  bowUp(): Animate {
    return bowUp(this.#props);
  }
}
