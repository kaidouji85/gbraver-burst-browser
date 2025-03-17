import { Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { PreRender } from "../../../game-loop/pre-render";
import { HUDCoordinate } from "../../../tracking/coordinate";
import { HUDTracking } from "../../../tracking/hud-tracking";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createGranDozerCutInProps,
  PropsCreatorOptions,
} from "./props/create-gran-dozer-cut-in-props";
import { GranDozerCutInProps } from "./props/gran-dozer-cut-in-props";

/** コンストラクタのパラメータ */
export type GranDozerCutInOptions = PropsCreatorOptions &
  GameObjectActionContainer;

/** グランドーザ カットイン */
export class GranDozerCutIn implements HUDTracking {
  /** プロパティ */
  #props: GranDozerCutInProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: GranDozerCutInOptions) {
    const { gameObjectAction } = options;
    this.#props = createGranDozerCutInProps(options);
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
