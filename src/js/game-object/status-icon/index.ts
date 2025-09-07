import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { notifyPushed } from "./procedures/notify-pushed";
import {
  createStatusIconProps,
  StatusIconPropsCreatorOptions,
} from "./props/create-status-icon-props";
import { StatusIconProps } from "./props/status-icon-props";

/** コンストラクタのオプション */
export type StatusIconOptions = StatusIconPropsCreatorOptions &
  GameObjectActionContainer;

/** ステータスアイコン */
export class StatusIcon {
  /** ステータスアイコンプロパティ */
  readonly #props: StatusIconProps;
  /** アンサブスクライバブル */
  readonly #unsubscribables: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options ステータスアイコン生成オプション
   */
  constructor(options: StatusIconOptions) {
    this.#props = createStatusIconProps(options);
    this.#unsubscribables = bindEventListeners(
      this.#props,
      options.gameObjectAction,
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribables.forEach((u) => u.unsubscribe());
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * ボタンを表示する
   * @returns アニメーション
   */
  open(): Animate {
    return open(this.#props);
  }

  /**
   * 決定
   * @returns アニメーション
   */
  decide(): Animate {
    return decide(this.#props);
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  notifyPushed(): Observable<void> {
    return notifyPushed(this.#props);
  }
}
