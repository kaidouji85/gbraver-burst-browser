// @flow

import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmDozerSprite } from "../armdozer-sprite";
import { avoid } from "./animation/avoid";
import { charge } from "./animation/charge";
import { dash } from "./animation/dash";
import { dashToStand } from "./animation/dash-to-stand";
import { down } from "./animation/down";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { upper } from "./animation/upper";
import { upperToStand } from "./animation/upper-to-stand";
import { createInitialValue } from "./model/initial-value";
import type { WingDozerModel } from "./model/wing-dozer-model";
import { WingDozerSounds } from "./sounds/wing-dozer-sounds";
import type { WingDozerView } from "./view/wing-dozer-view";

/**
 * ウィングドーザ
 */
export class WingDozer implements ArmDozerSprite {
  #model: WingDozerModel;
  #view: WingDozerView;
  #sounds: WingDozerSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: WingDozerView,
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>
  ): void {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new WingDozerSounds(resources);
    this.#unsubscriber = gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#onUpdate();
      } else if (action.type === "PreRender") {
        this.#onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
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
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#view.addObject3D(object);
  }

  /**
   * ダッシュ
   *
   * @return アニメーション
   */
  dash(): Animate {
    return dash(this.#model, this.#sounds);
  }

  /**
   * ダッシュ -> 立ち
   *
   * @return アニメーション
   */
  dashToStand(): Animate {
    return dashToStand(this.#model, this.#sounds);
  }

  /**
   * ノックバック
   *
   * @return アニメーション
   */
  knockBack(): Animate {
    return knockBack(this.#model);
  }

  /**
   * ノックバック -> 立ちポーズ
   *
   * @return アニメーション
   */
  knockBackToStand(): Animate {
    return knockBackToStand(this.#model, this.#sounds);
  }

  /**
   * ガード
   *
   * @return アニメーション
   */
  guard(): Animate {
    return guard(this.#model);
  }

  /**
   * ガード -> 立ちポーズ
   *
   * @return アニメーション
   */
  guardToStand(): Animate {
    return guardToStand(this.#model, this.#sounds);
  }

  /**
   * 避け
   *
   * @return アニメーション
   */
  avoid(): Animate {
    return avoid(this.#model, this.#sounds);
  }

  /**
   * 避け -> 立ち
   *
   * @return アニメーション
   */
  avoidToStand(): Animate {
    return frontStep(this.#model, this.#sounds);
  }

  /**
   * ダウン
   *
   * @return アニメーション
   */
  down(): Animate {
    return down(this.#model);
  }

  /**
   * チャージ
   *
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#model, this.#sounds);
  }

  /**
   * アッパー
   *
   * @return アニメーション
   */
  upper(): Animate {
    return upper(this.#model);
  }

  /**
   * アッパー -> 立ち
   *
   * @return アニメーション
   */
  upperToStand(): Animate {
    return upperToStand(this.#model, this.#sounds);
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
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
