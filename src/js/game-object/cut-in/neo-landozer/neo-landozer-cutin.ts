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
  createNeoLandozerCutInProps,
  PropsCreatorParams,
} from "./props/create-neo-landozer-cutin-props";
import { NeoLandozerCutInProps } from "./props/neo-landozer-cutin-props";

/** コンストラクタのパラメータ */
export type NeoLandozerCutInParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ネオランドーザ カットイン */
export class NeoLandozerCutIn implements HUDTracking {
  /** プロパティ */
  #props: NeoLandozerCutInProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: NeoLandozerCutInParams) {
    const { gameObjectAction } = params;
    this.#props = createNeoLandozerCutInProps(params);
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

  /** @override */
  tracking(coordinate: HUDCoordinate): void {
    const { x, y } = coordinate;
    this.#props.model.tracking.x = x;
    this.#props.model.tracking.y = y;
  }

  /**
   * カットインを表示する
   *
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * カットインを非表示にする
   *
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
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
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
