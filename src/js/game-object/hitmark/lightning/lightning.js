// @flow

import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { popUp } from "./animation/pop-up";
import { createInitialValue } from "./model/initial-value";
import type { LightningModel } from "./model/lightning-model";
import { LightningSounds } from "./sounds/lightning-sounds";
import type { LightningView } from "./view/lightning-view";

/**
 * 電撃ヒットマーク
 */
export class Lightning {
  #model: LightningModel;
  #view: LightningView;
  #sounds: LightningSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: LightningView,
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>
  ) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new LightningSounds(resources);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
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
   * エフェクトを一瞬だけ表示する
   *
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this.#model, this.#sounds);
  }

  /**
   * シーンに追加するオブジェクトを取得する
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
}
