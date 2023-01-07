import * as THREE from "three";
import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import type { GaiModel } from "./model/gai-model";
import { createInitialValue } from "./model/initial-value";
import { GaiSounds } from "./sounds/gai-sounds";
import type { GaiView } from "./view/gai-view";

/**
 * ガイ カットイン
 */
export class GaiCutIn {
  #model: GaiModel;
  #view: GaiView;
  #sounds: GaiSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: GaiView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new GaiSounds(resources);
    this.#unsubscriber = gameObjectAction.subscribe(action => {
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
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#model, this.#sounds);
  }

  /**
   * カットインを非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#model);
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
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }

}