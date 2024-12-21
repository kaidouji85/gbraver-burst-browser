import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { createGranDozerProps } from "./props/create-gran-dozer-props";
import { GranDozerProps } from "./props/gran-dozer-props";
import { GranDozerView } from "./view/gran-dozer-view";
import * as THREE from "three";

/** オプション */
type Options = {
  /** ビュー */
  view: GranDozerView;
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
    const { view } = options;
    super();
    this.#props = createGranDozerProps(view);
    this.#unsubscribers = bindEventListeners({
      ...options,
      props: this.#props,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    this.#unsubscribers.forEach((unsubscribe) => {
      unsubscribe.unsubscribe();
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
}
