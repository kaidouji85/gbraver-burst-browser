// @flow

import { Howl } from "howler";
import * as THREE from "three";
import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { popUp } from "./animation/pop-up";
import type { ShockWaveModel } from "./model/shock-wave-model";
import type { ShockWaveView } from "./view/shock-wave-view";

/**
 * 衝撃波
 */
export class ShockWave {
  #model: ShockWaveModel;
  #view: ShockWaveView;
  #hitSound: typeof Howl;
  #unsubscriber: Unsubscriber;

  /**
   * リソース管理オブジェクト
   *
   * @param view ビュー
   * @param initialModel モデルの初期値
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: ShockWaveView,
    initialModel: ShockWaveModel,
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>
  ) {
    this.#model = initialModel;
    this.#view = view;

    const hitResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.MECHA_IMPACT
    );
    this.#hitSound = hitResource ? hitResource.sound : new Howl();

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
    return process(() => {
      this.#hitSound.play();
    }).chain(popUp(this.#model));
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
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
