import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { GameObjectAction } from "../../action/game-object-action";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { armHammerAttack } from "./animation/arm-hammer-attack";
import { armHammerCharge } from "./animation/arm-hammer-charge";
import { endActive } from "./animation/end-active";
import { hmToStand } from "./animation/hm-to-stand";
import { startActive } from "./animation/start-active";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createGranDozerProps,
  GranDozerPropsCreatorOptions,
} from "./props/create-gran-dozer-props";
import { GranDozerProps } from "./props/gran-dozer-props";

/** オプション */
type Options = GranDozerPropsCreatorOptions & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** グランドーザースプライト */
export class GranDozer extends EmptyArmdozerSprite {
  /** プロパティ */
  #props: GranDozerProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[] = [];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: Options) {
    super();
    this.#props = createGranDozerProps(options);
    this.#unsubscribers = bindEventListeners({
      ...options,
      props: this.#props,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((unsubscribe) => {
      unsubscribe.unsubscribe();
    });
  }

  /**
   * アームハンマー チャージ
   * @returns アニメーション
   */
  armHammerCharge(): Animate {
    return armHammerCharge(this.#props);
  }

  /**
   * アームハンマー アタック
   * @returns アニメーション
   */
  armHammerAttack(): Animate {
    return armHammerAttack(this.#props);
  }

  /**
   * アームハンマー -> 立ち
   * @returns アニメーション
   */
  hmToStand(): Animate {
    return hmToStand(this.#props);
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
}
