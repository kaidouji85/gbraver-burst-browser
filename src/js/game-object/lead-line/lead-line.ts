import * as THREE from "three";
import {LeadLineModel, Position} from "./model/lead-line-model";
import {LeadLineView} from "./view/lead-line-view";
import {initialValue} from "./model/initial-value";
import {Observable, Unsubscribable} from "rxjs";
import {GameObjectAction} from "../action/game-object-action";

/** 引き出し線 */
export class LeadLine {
  /** モデル */
  #model: LeadLineModel;
  /** ビュー */
  #view: LeadLineView;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[]

  /**
   * コンストラクタ
   * @param view ビュー
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: LeadLineView, gameObjectAction: Observable<GameObjectAction>) {
    this.#model = initialValue();
    this.#view = view;
    this.#unsubscribers = [
      gameObjectAction.subscribe(action => {
        if (action.type === "Update") {
          this.#onUpdate();
        }
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach(unsubscriber => unsubscriber.unsubscribe());
  }

  /**
   * 引き出し線を設定する
   * @param start 起点
   * @param end 終点
   */
  set(start: Position, end: Position): void {
    this.#model.start = start;
    this.#model.end = end;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * Update時の処理
   * @private
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }
}
