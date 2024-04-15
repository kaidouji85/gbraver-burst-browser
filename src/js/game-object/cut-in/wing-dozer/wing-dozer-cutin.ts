import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { HUDTracking } from "../../../tracking/hud-tracking";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createWingDozerCutInProps,
  PropsCreatorParams,
} from "./props/create-wing-dozer-cutin-props";
import { WingDozerCutInProps } from "./props/wing-dozer-cutin-props";

/** コンストラクタのパラメータ */
export type WingDozerCutInParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ウィングドーザ カットイン */
export class WingDozerCutIn implements HUDTracking {
  /** プロパティ */
  #props: WingDozerCutInProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: WingDozerCutInParams) {
    const { gameObjectAction } = params;
    this.#props = createWingDozerCutInProps(params);
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
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * カットインを表示する
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * カットインを消す
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /** @override */
  tracking(x: number, y: number): void {
    this.#props.model.tracking.x = x;
    this.#props.model.tracking.y = y;
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
