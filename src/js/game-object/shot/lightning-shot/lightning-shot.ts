import * as THREE from "three";

import {
  createLightningShotProps,
  lightningShotPropsOptions,
} from "./props/create-lightning-shot-props";
import { LightningShotProps } from "./props/lightning-shot-props";
import { Observable, Unsubscribable } from "rxjs";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { GameObjectAction } from "../../action/game-object-action";

/** 電撃ショットオプション */
type LightningShotOptions = lightningShotPropsOptions & {
  gameObjectAction: Observable<GameObjectAction>;
};

/** 電撃ショット */
export class LightningShot {
  /** プロパティ */
  #props: LightningShotProps;
  /** アンサブスクライバー */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.view ビュー
   */
  constructor(options: LightningShotOptions) {
    this.#props = createLightningShotProps(options);
    this.#unsubscribers = bindEventListeners({
      ...options,
      props: this.#props,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.mesh.destructor();
    this.#unsubscribers.forEach((unsubscriber) => unsubscriber.unsubscribe());
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.mesh.getObject3D();
  }
}
