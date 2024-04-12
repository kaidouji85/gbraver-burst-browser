import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import type { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { Resources } from "../../resource";
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
  #toggleTween: TWEEN.Group;
  #toggle: Subject<number>;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = createInitialValue();
    this.#view = new TimeScaleButtonView(resources, gameObjectAction);
    this.#sounds = createTimeScaleButtonSounds(resources);
    this.#toggleTween = new TWEEN.Group();
    this.#toggle = new Subject();
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate(action);
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      this.#view.notifyPressed().subscribe(() => {
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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * タイムスケール変更通知
   * @return 通知ストリーム
   */
  notifyToggled(): Observable<number> {
    return this.#toggle;
  }

  /**
   * 操作不可能、可能を設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void {
    this.#model.disabled = isDisabled;
  }

  /**
   * 操作不可能であるか否かを判定する
   * @return trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#model.disabled;
  }

  /**
   * ボタンを表示する
   * @param timeScale タイムスケール値
   * @return アニメーション
   */
  open(timeScale: number): Animate {
    return open(this.#model, timeScale);
  }

  /**
   * ボタンを非表示にする
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#model);
  }

  /**
   * アップデート時の処理
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#toggleTween.update(action.time);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }

  /**
   * ボタン押下時の処理
   */
  #onButtonPush(): void {
    if (this.#model.shouldPushNotifierStop || this.#model.disabled) {
      return;
    }

    this.#toggleTween.update();
    this.#toggleTween.removeAll();
    const nextTimeScale = getNextTimeScale(this.#model.timeScale);
    toggle(this.#model, this.#sounds, this.#toggleTween, nextTimeScale).play();
    this.#toggle.next(nextTimeScale);
  }
}
