import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import type { GameObjectAction } from "../action/game-object-action";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import type { BurstButtonModel } from "./model/burst-button-model";
import { createInitialValue } from "./model/initial-value";
import type { ArmdozerIcon } from "./view/armdozer-icon";
import { BurstButtonView } from "./view/burst-button-view";

/** バーストボタン */
export class BurstButton {
  /** モデル */
  #model: BurstButtonModel;
  /** ビュー */
  #view: BurstButtonView;
  /** 効果音 ボタン押下 */
  #pushButtonSound: SoundResource;
  /** ボタン押下通知 */
  #pushButton: Subject<Event>;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param armdozerIcon アームドーザアイコン
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
    armdozerIcon: ArmdozerIcon,
  ) {
    this.#pushButtonSound = resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)
      ?? createEmptySoundResource();
    this.#pushButton = new Subject();
    this.#model = createInitialValue();
    this.#view = new BurstButtonView({
      resources: resources,
      gameObjectAction: gameObjectAction,
      armdozerIcon: armdozerIcon,
      onPush: (event) => {
        this.#onPush(event);
      },
    });
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
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
   * ボタンを表示する
   * @param canBurst バースト可能フラグ、trueでバースト可能
   * @return アニメーション
   */
  open(canBurst: boolean): Animate {
    return open(this.#model, canBurst);
  }

  /**
   * 決定アニメーション
   * @return アニメーション
   */
  decide(): Animate {
    this.#pushButtonSound.sound.play();
    return decide(this.#model);
  }

  /**
   * ボタンを非表示にする
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#model);
  }

  /**
   * three.jsオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * ボタン押下通知
   * @return 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return this.#pushButton;
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
   * プリレンダー時の処理
   * @param action プリレンダー情報
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }

  /**
   * ボタンを押した時の処理
   * @param event イベント
   */
  #onPush(event: Event): void {
    if (
      this.#model.isPushNotifierDisabled ||
      this.#model.disabled ||
      !this.#model.canBurst
    ) {
      return;
    }

    this.#pushButton.next(event);
  }
}
