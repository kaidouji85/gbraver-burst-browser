import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { PreRender } from "../../../game-loop/pre-render";
import { GameObjectAction } from "../../action/game-object-action";
import { popUp } from "./animation/pop-up";
import {
  createShockWaveProps,
  PropsCreatorParams,
} from "./props/create-shock-wave-props";
import { ShockWaveProps } from "./props/shock-wave-props";

/** コンストラクタのパラメータ */
export type ShockWaveParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** 衝撃波 */
export class ShockWave {
  /** プロパティ */
  #props: ShockWaveProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * リソース管理オブジェクト
   * @param params パラメータ
   */
  constructor(params: ShockWaveParams) {
    const { gameObjectAction } = params;
    this.#props = createShockWaveProps(params);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      } else if (action.type === "PreRender") {
        this.#onPreRender(action);
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
   * 衝撃波を表示する
   * @returns アニメーション
   */
  popUp(): Animate {
    return popUp(this.#props);
  }

  /**
   * シーンに追加するオブジェクトを返す
   * @returns シーンに追加するオブジェクト
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

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
