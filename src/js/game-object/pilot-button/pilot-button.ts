import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import { createInitialValue } from "./model/initial-value";
import type { PilotButtonModel } from "./model/pilot-button-model";
import { PilotButtonSounds } from "./sounds/pilot-button-sounds";
import { PilotButtonView } from "./view/pilot-button-view";
import type { PilotIcon } from "./view/pilot-icon";

/** パイロットボタン */
export class PilotButton {
  #model: PilotButtonModel;
  #sounds: PilotButtonSounds;
  #view: PilotButtonView;
  #pushButton: Subject<Event>;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotIcon パイロットアイコン
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    resources: Resources,
    pilotIcon: PilotIcon,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = createInitialValue();
    this.#sounds = new PilotButtonSounds(resources);
    this.#view = new PilotButtonView(resources, pilotIcon, gameObjectAction);
    this.#pushButton = new Subject();
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      this.#view.notifyPressed().subscribe((event) => {
        this.#onPush(event);
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
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
   * パイロットボタン を表示する
   * @param canPilot ボタン利用フラグ、trueで利用可能
   * @return アニメーション
   */
  open(canPilot: boolean): Animate {
    return open(this.#model, canPilot);
  }

  /**
   * ボタンクリック
   * @return アニメーション
   */
  decide(): Animate {
    return decide(this.#model, this.#sounds);
  }

  /**
   * パイロットボタンを非表示にする
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#model);
  }

  /**
   * ボタン押下通知
   * @return 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return this.#pushButton;
  }

  /**
   * パイロットボタンが操作不可能であるか否かを設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void {
    this.#model.disabled = isDisabled;
  }

  /**
   * パイロットボタンが操作不可能であるか否かを取得する
   * @return trueで操作不可能
   */
  isDisabled(): boolean {
    return this.#model.disabled;
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
   * @param event イベント
   */
  #onPush(event: Event): void {
    if (
      !this.#model.shouldPushNotifierStop &&
      !this.#model.disabled &&
      this.#model.canActivatePilotSkill
    ) {
      this.#pushButton.next(event);
    }
  }
}
