import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { popUp } from "./animation/pop-up";
import type { ShockWaveModel } from "./model/shock-wave-model";
import type { ShockWaveView } from "./view/shock-wave-view";

/** 衝撃波 */
export class ShockWave {
  /** モデル */
  #model: ShockWaveModel;
  /** ビュー */
  #view: ShockWaveView;
  /** ヒット音 */
  #hitSound: SoundResource;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * リソース管理オブジェクト
   * @param view ビュー
   * @param initialModel モデルの初期値
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: ShockWaveView,
    initialModel: ShockWaveModel,
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = initialModel;
    this.#view = view;
    this.#hitSound =
      resources.sounds.find((v) => v.id === SOUND_IDS.MECHA_IMPACT) ??
      createEmptySoundResource();
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      } else if (action.type === "PreRender") {
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
   * 衝撃波を表示する
   *
   * @return アニメーション
   */
  popUp(): Animate {
    return onStart(() => {
      this.#hitSound.sound.play();
    }).chain(popUp(this.#model));
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
