import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Update } from "../../../game-loop/update";
import type { Resources } from "../../../resource";
import { firstUpdate } from "../../action/first-update";
import type { GameObjectAction } from "../../action/game-object-action";
import { electrification } from "./animation/electrification";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { createInitialValue } from "./model/initial-value";
import type { LightningBarrierModel } from "./model/lightning-barrier-model";
import { LightningBarrierSounds } from "./sounds/lightning-barrier-sounds";
import { LightningBarrierView } from "./view/lightning-barrier-view";

/** 電撃バリア */
export class LightningBarrierGameEffect {
  #model: LightningBarrierModel;
  #view: LightningBarrierView;
  #sounds: LightningBarrierSounds;
  #tweenGroup: TWEEN.Group;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = createInitialValue();
    this.#view = new LightningBarrierView(resources);
    this.#sounds = new LightningBarrierSounds(resources);
    this.#tweenGroup = new TWEEN.Group();
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate(action);
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
      firstUpdate(gameObjectAction).subscribe(() => {
        this.#onFirstUpdate();
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#tweenGroup.removeAll();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * バリアを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#model, this.#sounds);
  }

  /**
   * バリアを消す
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
  }

  /**
   * 初回のアップデート処理
   */
  #onFirstUpdate(): void {
    electrification(this.#model, this.#tweenGroup).loop();
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#tweenGroup.update(action.time);
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
