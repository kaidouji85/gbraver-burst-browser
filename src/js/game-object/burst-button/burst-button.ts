import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import { BurstButtonProps } from "./props/burst-button-props";
import {
  createBurstButtonProps,
  GenerateBurstButtonPropsParams,
} from "./props/create-burst-button-props";

/** コンストラクタのパラメータ */
type Params = GenerateBurstButtonPropsParams;

/** バーストボタン */
export class BurstButton {
  /** プロパティ */
  #props: BurstButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    const { gameObjectAction } = params;
    this.#props = createBurstButtonProps(params);
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      this.#props.view.notifyPush().subscribe((event) => {
        this.#onPush(event);
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
  }

  /**
   * ボタンを表示する
   * @param canBurst バースト可能フラグ、trueでバースト可能
   * @return アニメーション
   */
  open(canBurst: boolean): Animate {
    return open(this.#props.model, canBurst);
  }

  /**
   * 決定アニメーション
   * @return アニメーション
   */
  decide(): Animate {
    this.#props.pushButtonSound.sound.play();
    return decide(this.#props.model);
  }

  /**
   * ボタンを非表示にする
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#props.model);
  }

  /**
   * three.jsオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * ボタン押下通知
   * @return 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return this.#props.pushButton;
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
   * プリレンダー時の処理
   * @param action プリレンダー情報
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }

  /**
   * ボタンを押した時の処理
   * @param event イベント
   */
  #onPush(event: Event): void {
    if (
      this.#props.model.isPushNotifierDisabled ||
      this.#props.model.disabled ||
      !this.#props.model.canBurst
    ) {
      return;
    }

    this.#props.pushButton.next(event);
  }
}
