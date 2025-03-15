import { Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { shot } from "./animation/shot";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createLightningShotProps,
  lightningShotPropsOptions,
} from "./props/create-lightning-shot-props";
import { LightningShotProps } from "./props/lightning-shot-props";

/** 電撃ショットオプション */
type LightningShotOptions = lightningShotPropsOptions &
  GameObjectActionContainer;

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
    this.#props.view.destructor();
    this.#unsubscribers.forEach((unsubscriber) => unsubscriber.unsubscribe());
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * 電撃ショットを発射する
   * @returns アニメーション
   */
  shot(): Animate {
    return shot(this.#props);
  }
}
