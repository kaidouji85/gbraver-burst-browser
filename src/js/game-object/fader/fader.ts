import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import { Update } from "../../game-loop/update";
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
  /** ビュー */
  view: FaderView;
};

/** 画面フェーダー */
export class Fader {
  /** モデル */
  #model: FaderModel;
  /** ビュー */
  #view: FaderView;
  /** 割り込み可能アニメのTWEENグループ */
  #tweenGroup: TWEEN.Group = new TWEEN.Group();
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#model = createInitialValue(param.isVisible);
    this.#view = param.view;
    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate(action);
      } else if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#tweenGroup.removeAll();
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * フェードイン
   * @param duration アニメーションの時間（ミリ秒）、省略時は500
   * @returns アニメーション
   */
  fadeIn(duration: number = 500): Animate {
    return fadeIn(this.#model, duration);
  }

  /**
   * フェードアウト
   * @param duration アニメーションの時間（ミリ秒）、省略時は500
   * @returns アニメーション
   */
  fadeOut(duration: number = 500): Animate {
    this.#tweenGroup.update();
    this.#tweenGroup.removeAll();
    return fadeOut(this.#model, duration);
  }

  /**
   * 不透明度を変更
   * @param value 不透明度
   * @param duration アニメーション時間
   * @returns アニメーション
   */
  opacity(value: number, duration: number): Animate {
    return opacity(this.#model, value, duration);
  }

  /**
   * 割り込み可能な不透明度変更
   * @param value 不透明度
   * @param duration アニメーション時間
   */
  interruptToOpacity(value: number, duration: number): void {
    this.#tweenGroup.update();
    this.#tweenGroup.removeAll();
    opacity(this.#model, value, duration).play({ group: this.#tweenGroup });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * アップデートの際の処理
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#tweenGroup.update(action.time);
  }

  /**
   * プリレンダーの際の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#model.width = action.rendererDOM.clientWidth;
    this.#model.height = action.rendererDOM.clientHeight;
    this.#view.engage(this.#model);
  }
}
