import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import type { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import { close } from "./animation/close";
import { open } from "./animation/open";
import { toggle } from "./animation/toggle";
import { getNextTimeScale } from "./model/next-time-scale";
import { createTimeScaleButtonProps,GenerateTimeScaleButtonPropsParams } from "./props/create-time-scale-button-props";
import { TimeScaleButtonProps } from "./props/time-scale-button-props";

/** コンストラクタのパラメータ */
type Params = GenerateTimeScaleButtonPropsParams;

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  /** プロパティ */
  #props: TimeScaleButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    const { gameObjectAction } = params;
    this.#props = createTimeScaleButtonProps(params);
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate(action);
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      this.#props.view.notifyPressed().subscribe(() => {
        this.#onButtonPush();
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * タイムスケール変更通知
   * @return 通知ストリーム
   */
  notifyToggled(): Observable<number> {
    return this.#props.toggle;
  }

  /**
   * 操作不可能、可能を設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void {
    this.#props.model.disabled = isDisabled;
  }

  /**
   * 操作不可能であるか否かを判定する
   * @return trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#props.model.disabled;
  }

  /**
   * ボタンを表示する
   * @param timeScale タイムスケール値
   * @return アニメーション
   */
  open(timeScale: number): Animate {
    return open(this.#props.model, timeScale);
  }

  /**
   * ボタンを非表示にする
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#props.model);
  }

  /**
   * アップデート時の処理
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#props.toggleTween.update(action.time);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }

  /**
   * ボタン押下時の処理
   */
  #onButtonPush(): void {
    if (
      this.#props.model.shouldPushNotifierStop ||
      this.#props.model.disabled
    ) {
      return;
    }

    this.#props.toggleTween.update();
    this.#props.toggleTween.removeAll();
    const nextTimeScale = getNextTimeScale(this.#props.model.timeScale);
    toggle(
      this.#props.model,
      this.#props.sounds,
      this.#props.toggleTween,
      nextTimeScale,
    ).play();
    this.#props.toggle.next(nextTimeScale);
  }
}
