import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Update } from "../../../game-loop/update";
import { firstUpdate } from "../../action/first-update";
import type { GameObjectAction } from "../../action/game-object-action";
import { electrification } from "./animation/electrification";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createLightningBarrierProps,
  PropsCreatorParams,
} from "./props/create-lightning-barrier-props";
import { LightningBarrierProps } from "./props/lightning-barrier-props";

/** コンストラクタのパラメータ */
export type LightningBarrierGameEffectParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** 電撃バリア */
export class LightningBarrierGameEffect {
  /** プロパティ */
  #props: LightningBarrierProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: LightningBarrierGameEffectParams) {
    const { gameObjectAction } = params;
    this.#props = createLightningBarrierProps(params);
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate(action);
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      firstUpdate(gameObjectAction).subscribe(() => {
        this.#onFirstUpdate();
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#props.tweenGroup.removeAll();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * バリアを表示する
   *
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * バリアを消す
   *
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * 初回のアップデート処理
   */
  #onFirstUpdate(): void {
    electrification(this.#props).loop({
      group: this.#props.tweenGroup,
    });
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#props.tweenGroup.update(action.time);
    this.#props.view.engage(this.#props.model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
