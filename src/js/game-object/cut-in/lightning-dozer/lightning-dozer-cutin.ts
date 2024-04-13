import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { HUDTracking } from "../../../tracking/hud-tracking";
import type { GameObjectAction } from "../../action/game-object-action";
import { hidden } from "./animation/hidden";
import { show } from "./animation/show";
import {
  createLightningDozerCutInProps,
  GenerateLightningDozerCutInPropsParams,
} from "./props/create-lightning-dozer-cutin-props";
import { LightningDozerCutInProps } from "./props/lightning-dozer-cutin-props";

/** コンストラクタのパラメータ */
export type ConstructLightningDozerCutInParams =
  GenerateLightningDozerCutInPropsParams & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/** ライトニングドーザ カットイン */
export class LightningDozerCutIn implements HUDTracking {
  /** プロパティ */
  #props: LightningDozerCutInProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: ConstructLightningDozerCutInParams) {
    const { gameObjectAction } = params;
    this.#props = createLightningDozerCutInProps(params);
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
    this.#props.view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this.#props.model);
  }

  /**
   * カットインを非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props.model);
  }

  /**
   * 3Dレイヤーオブジェクトのトラッキンングを行う
   * 本パラメータにはHUD座標系に変換した値をセットすること
   *
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void {
    this.#props.model.tracking.x = x;
    this.#props.model.tracking.y = y;
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.engage(this.#props.model, action);
  }
}
