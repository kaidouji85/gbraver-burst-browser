import { Unsubscribable } from "rxjs";
import * as THREE from "three";

import { GameObjectActionContainer } from "../action/game-object-action-container";
import { Color, PLAYER_DEATH_ALERT_COLOR } from "./color";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { play } from "./procedure/play";
import { startEnemyAlert } from "./procedure/start-enemy-alert";
import { startPlayerAlert } from "./procedure/start-player-alert";
import { stop } from "./procedure/stop";
import {
  createDeathAlertProps,
  DeathAlertPropsCreatorOptions,
} from "./props/create-death-alert-props";
import { DeathAlertProps } from "./props/death-alert-props";

/** デスアラート */
export class DeathAlert {
  /** プロパティ */
  #props: DeathAlertProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.resources リソース管理オブジェクト
   * @param options.se SEプレイヤー
   * @param options.gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    options: DeathAlertPropsCreatorOptions & GameObjectActionContainer,
  ) {
    this.#props = createDeathAlertProps(options);
    this.#unsubscribers = bindEventListeners(
      this.#props,
      options.gameObjectAction,
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((u) => u.unsubscribe());
    this.#props.sounds.deathAlert.sound.stop();
    this.#props.tweenGroup.removeAll();
  }

  /**
   * シーンに追加するための THREE.Object3D を取得する
   * @returns シーンに追加するための THREE.Object3D
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * @deprecated
   * 再生する
   * @param duration ビネット表示にかかる時間（ミリ秒）
   * @param color ビネットの色
   */
  play(duration: number, color: Color = PLAYER_DEATH_ALERT_COLOR): void {
    play(this.#props, duration, color);
  }

  /**
   * プレイヤーデスアラートを再生する
   * @param duration ビネット表示にかかる時間（ミリ秒）
   */
  startPlayerAlert(duration: number): void {
    startPlayerAlert(this.#props, duration);
  }

  /**
   * 敵デスアラートを再生する
   * @param duration ビネット表示にかかる時間（ミリ秒）
   */
  startEnemyAlert(duration: number): void {
    startEnemyAlert(this.#props, duration);
  }

  /**
   * 停止する
   * @param duration ビネット非表示にかかる時間（ミリ秒）
   */
  stop(duration: number): void {
    stop(this.#props, duration);
  }

  /**
   * 再生中かどうかを取得する
   * @returns trueで再生中
   */
  isPlaying(): boolean {
    return this.#props.isPlaying;
  }
}
