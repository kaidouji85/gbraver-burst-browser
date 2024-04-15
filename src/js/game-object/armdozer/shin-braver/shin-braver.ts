import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { avoid } from "./animation/avoid";
import { bowDown } from "./animation/bow-down";
import { bowUp } from "./animation/bow-up";
import { burst } from "./animation/burst";
import { burstToStand } from "./animation/burst-to-stand";
import { charge } from "./animation/charge";
import { down } from "./animation/down";
import { endActive } from "./animation/end-active";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { guts } from "./animation/guts";
import { gutsToStand } from "./animation/guts-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { punchToStand } from "./animation/punch-to-stand";
import { startActive } from "./animation/start-active";
import { straightPunch } from "./animation/straight-punch";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createShinBraverProps,
  PropsCreatorParams,
} from "./props/create-shin-braver-props";
import { ShinBraverProps } from "./props/shin-braver-props";

/** コンストラクタのパラメータ */
type ShinBraverParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver extends EmptyArmdozerSprite implements ArmdozerSprite {
  /** プロパティ */
  #props: ShinBraverProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: ShinBraverParams) {
    super();
    const { gameObjectAction } = params;
    this.#props = createShinBraverProps(params);
    this.#unsubscribers = bindEventListeners({
      props: this.#props,
      gameObjectAction,
    });
  }

  /** @override */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
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
   * ストレートパンチ
   * @return アニメーション
   */
  straightPunch(): Animate {
    return straightPunch(this.#props);
  }

  /** @override */
  punchToStand(): Animate {
    return punchToStand(this.#props);
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

  /**
   * バースト
   * @return アニメーション
   */
  burst(): Animate {
    return burst(this.#props);
  }

  /**
   * バースト -> 立ち
   * @return アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this.#props);
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

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }
}
