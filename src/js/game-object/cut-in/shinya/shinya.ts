import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createShinyaCutInProps,
  GenerateShinyaCutInPropsParams,
} from "./props/create-shinya-cutin-props";
import { ShinyaCutInProps } from "./props/shinya-cutin-props";

/** コンストラクタのパラメータ */
export type ConstructShinyaCutInParams = GenerateShinyaCutInPropsParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** シンヤ カットイン */
export class ShinyaCutIn {
  /** プロパティ */
  #props: ShinyaCutInProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: ConstructShinyaCutInParams) {
    const { gameObjectAction } = params;
    this.#props = createShinyaCutInProps(params);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
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
   * カットインを表示する
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * カットインを非表示にする
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
