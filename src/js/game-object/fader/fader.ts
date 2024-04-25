import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { GameObjectAction } from "../action/game-object-action";
import { fadeIn } from "./animation/fade-in";
import { fadeOut } from "./animation/fade-out";
import { opacity } from "./animation/opacity";
import type { FaderModel } from "./model/fader-model";
import { createInitialValue } from "./model/initial-value";
import { FaderView } from "./view/fader-view";

/** コンストラクタのパラメータ */
type Param = {
  /** 表示フラグ、trueで表示する */
  isVisible: boolean;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;

  /** Z座標 */
  z: number;
};

/** 画面フェーダー */
export class Fader {
  #model: FaderModel;
  #view: FaderView;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#model = createInitialValue(param.isVisible);
    this.#view = new FaderView(param.z);
    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * フェードイン
   *
   * @returns アニメーション
   */
  fadeIn(): Animate {
    return fadeIn(this.#model);
  }

  /**
   * フェードアウト
   *
   * @returns アニメーション
   */
  fadeOut(): Animate {
    return fadeOut(this.#model);
  }

  /**
   * 不透明度を変更
   *
   * @param value 不透明度
   * @param duration アニメーション時間
   * @returns アニメーション
   */
  opacity(value: number, duration: number): Animate {
    return opacity(this.#model, value, duration);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * プリレンダーの際の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#model.width = action.rendererDOM.clientWidth;
    this.#model.height = action.rendererDOM.clientHeight;
    this.#view.engage(this.#model);
  }
}
