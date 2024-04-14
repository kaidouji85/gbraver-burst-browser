import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { HUDTracking } from "../../../tracking/hud-tracking";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import type { ShinBraverCutInView } from "./view/shin-braver-cutin-view";
import { ShinBraverCutInProps } from "./props/shin-braver-cutin-props";
import { createShinBraverCutInProps } from "./props/create-shin-braver-cutin-props";

/**
 * シンブレイバーカットイン
 */
export class ShinBraverCutIn implements HUDTracking {
  /** プロパティ */
  #props: ShinBraverCutInProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: ShinBraverCutInView,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#props = createShinBraverCutInProps({ view });
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

  /** @override */
  tracking(x: number, y: number): void {
    this.#props.model.tracking.x = x;
    this.#props.model.tracking.y = y;
  }

  /**
   * カットインを表示する
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#props.model);
  }

  /**
   * カットインを非表示にする
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props.model);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
