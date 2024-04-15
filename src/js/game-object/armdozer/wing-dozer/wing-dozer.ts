import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { avoid } from "./animation/avoid";
import { bowDown } from "./animation/bow-down";
import { bowUp } from "./animation/bow-up";
import { charge } from "./animation/charge";
import { dash } from "./animation/dash";
import { dashToStand } from "./animation/dash-to-stand";
import { down } from "./animation/down";
import { endActive } from "./animation/end-active";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { startActive } from "./animation/start-active";
import { upper } from "./animation/upper";
import { upperToStand } from "./animation/upper-to-stand";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createWingDozerProps,
  PropsCreatorParams,
} from "./props/create-wing-dozer-props";
import { WingDozerProps } from "./props/wing-dozer-props";

/** コンストラクタのパラメータ */
type WingDozerParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ウィングドーザ */
export class WingDozer extends EmptyArmdozerSprite implements ArmdozerSprite {
  /** プロパティ */
  #props: WingDozerProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: WingDozerParams) {
    super();
    const { gameObjectAction } = params;
    this.#props = createWingDozerProps(params);
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
   * ダッシュ
   * @return アニメーション
   */
  dash(): Animate {
    return dash(this.#props);
  }

  /**
   * ダッシュ -> 立ち
   * @return アニメーション
   */
  dashToStand(): Animate {
    return dashToStand(this.#props);
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
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#props);
  }

  /**
   * アッパー
   * @return アニメーション
   */
  upper(): Animate {
    return upper(this.#props);
  }

  /**
   * アッパー -> 立ち
   * @return アニメーション
   */
  upperToStand(): Animate {
    return upperToStand(this.#props);
  }
}
