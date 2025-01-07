import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { GameObjectAction } from "../../action/game-object-action";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { endActive } from "./animation/end-active";
import { hmAttack } from "./animation/hm-attack";
import { hmCharge } from "./animation/hm-charge";
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
   * アームハンマーチャージ
   * @returns アニメーション
   */
  hmCharge(): Animate {
    return hmCharge(this.#props);
  }

  /**
   * アームハンマーアタック
   * @returns アニメーション
   */
  hmAttack(): Animate {
    return hmAttack(this.#props);
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
