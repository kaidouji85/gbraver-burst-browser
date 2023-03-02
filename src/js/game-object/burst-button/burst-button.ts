import { Howl } from "howler";
import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Resources } from "../../resource";
import { SOUND_IDS } from "../../resource/sound";
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
  #model: BurstButtonModel;
  #view: BurstButtonView;
  #pushButtonSound: Howl;
  #pushButton: Subject<Event>;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param armdozerIcon アームドーザアイコン
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
    armdozerIcon: ArmdozerIcon
  ) {
    const pushButtonResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.PUSH_BUTTON
    );
    this.#pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl({ src: "" });
    this.#pushButton = new Subject();
    this.#model = createInitialValue();
    this.#view = new BurstButtonView({
      resources: resources,
      gameObjectAction: gameObjectAction,
      armdozerIcon: armdozerIcon,
      onPush: (event) => {
        if (this.#model.disabled || !this.#model.canBurst) {
          return;
        }

        this.#pushButton.next(event);
      },
    });
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        this.#preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * ボタンを表示する
   *
   * @param canBurst バースト可能フラグ、trueでバースト可能
   * @return アニメーション
   */
  open(canBurst: boolean): Animate {
    return open(this.#model, canBurst);
  }

  /**
   * 決定アニメーション
   *
   * @return アニメーション
   */
  decide(): Animate {
    this.#pushButtonSound.play();
    return decide(this.#model);
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
   * three.jsオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * ボタン押下通知
   *
   * @return 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return this.#pushButton;
  }

  /** プリレンダー */
  #preRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}
