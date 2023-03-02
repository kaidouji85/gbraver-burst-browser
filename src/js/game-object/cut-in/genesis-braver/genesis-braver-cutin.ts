import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";
import { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraverCutInModel } from "./model/genesis-braver-cutin-model";
import { createInitialValue } from "./model/initial-value";
import { GenesisBraverCutInView } from "./view/genesis-braver-cutin-view";

/** ジェネシスブレイバー カットイン */
export class GenesisBraverCutIn {
  /** モデル */
  #model: GenesisBraverCutInModel;
  /** ビュー */
  #view: GenesisBraverCutInView;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: GenesisBraverCutInView, gameObjectAction: Observable<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#unsubscribers = [
      gameObjectAction.subscribe(action => {
        if (action.type === "PreRender") {
          this.#onPreRender();
        }
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this.#view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * プリレンダー時の処理
   */
  #onPreRender(): void {
    this.#view.engage(this.#model);
  }
}