import * as THREE from "three";
import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { HUDTracking } from "../../../tracking/hud-tracking";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { createInitialValue } from "./model/initial-value";
import type { WingDozerCutInModel } from "./model/wing-dozer-cutin-model";
import type { WingDozerCutInView } from "./view/wing-dozer-cutin-view";

/**
 * ウィングドーザ カットイン
 */
export class WingDozerCutIn implements HUDTracking {
  #model: WingDozerCutInModel;
  #view: WingDozerCutInView;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: WingDozerCutInView, gameObjectAction: Stream<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#model);
  }

  /**
   * カットインを消す
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * 3Dレイヤーのオブジェクトをトラッキングする
   * 本メソッドにはHUDレイヤー系座標をセットすること
   *
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void {
    this.#model.tracking.x = x;
    this.#model.tracking.y = y;
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }

}