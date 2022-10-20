// @flow
import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

import type { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { Resources } from "../../resource";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { close } from "./animation/close";
import { open } from "./animation/open";
import { toggle } from "./animation/toggle";
import { createInitialValue } from "./model/initial-value";
import { getNextTimeScale } from "./model/next-time-scale";
import type { TimeScaleButtonModel } from "./model/time-scale-button-model";
import type { TimeScaleButtonSounds } from "./sounds/time-scale-sounds";
import { createTimeScaleButtonSounds } from "./sounds/time-scale-sounds";
import { TimeScaleButtonView } from "./view/time-scale-button-view";

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  #model: TimeScaleButtonModel;
  #view: TimeScaleButtonView;
  #sounds: TimeScaleButtonSounds;
  #toggleTween: typeof TWEEN.Group;
  #toggle: StreamSource<number>;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>
  ) {
    this.#model = createInitialValue();
    this.#view = new TimeScaleButtonView(resources, gameObjectAction);
    this.#sounds = createTimeScaleButtonSounds(resources);
    this.#toggleTween = new TWEEN.Group();
    this.#toggle = createStreamSource();
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate(action);
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      this.#view.pushButtonNotifier().subscribe(() => {
        this.#onButtonPush();
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * タイムスケール変更通知
   *
   * @return 通知ストリーム
   */
  toggleNotifier(): Stream<number> {
    return this.#toggle;
  }

  /**
   * ボタンを表示する
   *
   * @param timeScale タイムスケール値
   * @return アニメーション
   */
  open(timeScale: number): Animate {
    return open(this.#model, timeScale);
  }

  /**
   * ボタンを非表示にする
   *
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#model);
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#toggleTween.update(action.time);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }

  /**
   * ボタン押下時の処理
   */
  #onButtonPush(): void {
    if (this.#model.disabled) {
      return;
    }

    this.#toggleTween.update();
    this.#toggleTween.removeAll();
    const nextTimeScale = getNextTimeScale(this.#model.timeScale);
    toggle(this.#model, this.#sounds, this.#toggleTween, nextTimeScale).play();
    this.#toggle.next(nextTimeScale);
  }
}
