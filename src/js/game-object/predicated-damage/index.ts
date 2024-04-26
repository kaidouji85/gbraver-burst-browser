import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../action/game-object-action";
import { bindEventListener } from "./procedure/bind-event-listener";
import {
  createPredicatedDamageProps,
  PredicatedDamagePropsCreatorParams,
} from "./props/create-predicated-damage-props";
import { PredicatedDamageProps } from "./props/predicated-damage-props";

/** コンストラクタのパラメータ */
type PredicatedDamageConstructParams = PredicatedDamagePropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ダメージ予想 */
export class PredicatedDamage {
  /** プロパティ */
  #props: PredicatedDamageProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PredicatedDamageConstructParams) {
    this.#props = createPredicatedDamageProps(params);
    this.#unsubscribers = bindEventListener({
      ...params,
      props: this.#props,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }
}
