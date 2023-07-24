import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import { createInitialValue } from "./model/initial-value";
import type { TsubasaModel } from "./model/tsubasa-model";
import { TsubasaSounds } from "./sounds/tsubasa-sounds";
import type { TsubasaView } from "./view/tsubasa-view";

/**
 * ツバサ カットイン
 */
export class TsubasaCutIn {
  #model: TsubasaModel;
  #view: TsubasaView;
  #sounds: TsubasaSounds;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: TsubasaView,
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new TsubasaSounds(resources);
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
