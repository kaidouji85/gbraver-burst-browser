import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import { HUDCoordinate } from "../../../tracking/coordinate";
import type { HUDTracking } from "../../../tracking/hud-tracking";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createShinBraverCutInProps,
  PropsCreatorParams,
} from "./props/create-shin-braver-cutin-props";
import { ShinBraverCutInProps } from "./props/shin-braver-cutin-props";

/** コンストラクタのパラメータ */
export type ShinBraverCutInParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** シンブレイバーカットイン */
export class ShinBraverCutIn implements HUDTracking {
  /** プロパティ */
  #props: ShinBraverCutInProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: ShinBraverCutInParams) {
    const { gameObjectAction } = params;
    this.#props = createShinBraverCutInProps(params);
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
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /** @override */
  tracking(coordinate: HUDCoordinate): void {
    const { x, y } = coordinate;
    this.#props.model.tracking.x = x;
    this.#props.model.tracking.y = y;
  }

  /**
   * カットインを表示する
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * カットインを非表示にする
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
