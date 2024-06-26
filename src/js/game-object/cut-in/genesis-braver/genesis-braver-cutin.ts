import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { PreRender } from "../../../game-loop/pre-render";
import { HUDCoordinate } from "../../../tracking/coordinate";
import { HUDTracking } from "../../../tracking/hud-tracking";
import { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createGenesisBraverCutInProps,
  PropsCreatorParams,
} from "./props/create-genesis-braver-cutin-props";
import { GenesisBraverCutInProps } from "./props/genesis-braver-cutin-props";

/** コンストラクタのパラメータ */
export type GenesisBraverCutInParams = PropsCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ジェネシスブレイバー カットイン */
export class GenesisBraverCutIn implements HUDTracking {
  /** プロパティ */
  #props: GenesisBraverCutInProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: GenesisBraverCutInParams) {
    const { gameObjectAction } = params;
    this.#props = createGenesisBraverCutInProps(params);
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#props.view.destructor();
  }

  /** @override */
  tracking(coordinate: HUDCoordinate): void {
    const { x, y } = coordinate;
    this.#props.model.tracking.x = x;
    this.#props.model.tracking.y = y;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * カットインを表示する
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * カットインを非表示にする
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * プリレンダー時の処理
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
