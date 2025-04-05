import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { GameObjectAction } from "../../action/game-object-action";
import { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { backStep } from "./animation/back-step";
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
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { spToStand } from "./animation/sp-to-stand";
import { startActive } from "./animation/start-active";
import { straightPunch } from "./animation/straight-punch";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createGenesisBraverProps,
  PropsCreatorParams,
} from "./props/create-genesis-braver-props";
import { GenesisBraverProps } from "./props/genesis-braver-props";

/** コンストラクタのパラメータ */
type GenesisBraverParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ジェネシスブレイバースプライト */
export class GenesisBraver
  extends EmptyArmdozerSprite
  implements ArmdozerSprite
{
  /** プロパティ */
  #props: GenesisBraverProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: GenesisBraverParams) {
    super();
    const { gameObjectAction } = params;
    this.#props = createGenesisBraverProps(params);
    this.#unsubscribers = bindEventListeners({
      gameObjectAction,
      props: this.#props,
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
  addObject3D(object: THREE.Object3D): void {
    this.#props.view.addObject3D(object);
  }

  /**
   * チャージ
   * @returns アニメーション
   */
  charge(): Animate {
    return charge(this.#props);
  }

  /**
   * ストレートパンチ
   * @returns アニメーション
   */
  straightPunch(): Animate {
    return straightPunch(this.#props);
  }

  /**
   * ストレートパンチ -> 立ち
   * @returns アニメーション
   */
  spToStand(): Animate {
    return spToStand(this.#props);
  }

  /**
   * バースト
   * @returns アニメーション
   */
  burst(): Animate {
    return burst(this.#props);
  }

  /**
   * バースト -> 立ち
   * @returns アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this.#props);
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
  down(): Animate {
    return down(this.#props);
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
    return backStep(this.#props);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#props);
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

  /** @override */
  startActive(): Animate {
    return startActive(this.#props);
  }

  /** @override */
  endActive(): Animate {
    return endActive(this.#props);
  }
}
