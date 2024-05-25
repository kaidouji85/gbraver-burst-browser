import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import type { Animate } from "../../animation/animate";
import { close } from "./animation/close";
import { open } from "./animation/open";
import { bindEventListener } from "./procedure/bind-event-listener";
import {
  createTimeScaleButtonProps,
  PropsCreatorParams,
} from "./props/create-time-scale-button-props";
import { TimeScaleButtonProps } from "./props/time-scale-button-props";

/** コンストラクタのパラメータ */
type TimeScaleButtonParams = PropsCreatorParams;

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
  constructor(params: TimeScaleButtonParams) {
    const { gameObjectAction } = params;
    this.#props = createTimeScaleButtonProps(params);
    this.#unsubscribers = bindEventListener(this.#props, gameObjectAction);
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
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * タイムスケール変更通知
   * @returns 通知ストリーム
   */
  notifyToggled(): Observable<number> {
    return this.#props.toggleNotify;
  }

  /**
   * 操作不可能、可能を設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void {
    this.#props.disabled = isDisabled;
  }

  /**
   * 操作不可能であるか否かを判定する
   * @returns trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#props.disabled;
  }

  /**
   * ボタンを表示する
   * @param timeScale タイムスケール値
   * @returns アニメーション
   */
  open(timeScale: number): Animate {
    return open(this.#props, timeScale);
  }

  /**
   * ボタンを非表示にする
   * @returns アニメーション
   */
  close(): Animate {
    return close(this.#props);
  }
}
