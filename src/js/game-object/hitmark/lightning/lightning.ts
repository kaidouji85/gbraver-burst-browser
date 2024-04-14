import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { GameObjectAction } from "../../action/game-object-action";
import { popUp } from "./animation/pop-up";
import { LightningProps } from "./props/lightning-props";
import {
  createLightningProps,
  GenerateLightningPropsParams,
} from "./props/create-lightning-props";

/** コンストラクタのパラメータ */
export type ConstructLightningParams = GenerateLightningPropsParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**電撃ヒットマーク */
export class Lightning {
  /** プロパティ */
  #props: LightningProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: ConstructLightningParams) {
    const { gameObjectAction } = params;
    this.#props = createLightningProps(params);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * エフェクトを一瞬だけ表示する
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this.#props.model, this.#props.sounds);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#props.view.engage(this.#props.model);
  }
}
