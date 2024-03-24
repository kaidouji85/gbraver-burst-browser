import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { avoid } from "./animation/avoid";
import { bowDown } from "./animation/bow-down";
import { bowUp } from "./animation/bow-up";
import { charge } from "./animation/charge";
import { dash } from "./animation/dash";
import { dashToStand } from "./animation/dash-to-stand";
import { down } from "./animation/down";
import { endActive } from "./animation/end-active";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { startActive } from "./animation/start-active";
import { upper } from "./animation/upper";
import { upperToStand } from "./animation/upper-to-stand";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { createInitialValue } from "./model/initial-value";
import type { WingDozerModel } from "./model/wing-dozer-model";
import { WingDozerSounds } from "./sounds/wing-dozer-sounds";
import type { WingDozerView } from "./view/wing-dozer-view";

/** ウィングドーザ */
export class WingDozer extends EmptyArmdozerSprite implements ArmdozerSprite {
  /** モデル */
  #model: WingDozerModel;
  /** ビュー */
  #view: WingDozerView;
  /** サウンド */
  #sounds: WingDozerSounds;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    view: WingDozerView,
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    super();
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new WingDozerSounds(resources);
    this.#unsubscribers = [
      gameObjectAction.subscribe((action) => {
        if (action.type === "Update") {
          this.#onUpdate();
        } else if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#view.addObject3D(object);
  }

  /** @override */
  startActive(): Animate {
    return startActive(this.#model);
  }

  /** @override */
  endActive(): Animate {
    return endActive(this.#model);
  }

  /**
   * ダッシュ
   * @return アニメーション
   */
  dash(): Animate {
    return dash(this.#model, this.#sounds);
  }

  /**
   * ダッシュ -> 立ち
   * @return アニメーション
   */
  dashToStand(): Animate {
    return dashToStand(this.#model, this.#sounds);
  }

  /** @override */
  upright(): Animate {
    return upright(this.#model, this.#sounds);
  }

  /** @override */
  uprightToStand(): Animate {
    return uprightToStand(this.#model, this.#sounds);
  }

  /** @override */
  bowDown(): Animate {
    return bowDown(this.#model, this.#sounds);
  }

  /** @override */
  bowUp(): Animate {
    return bowUp(this.#model, this.#sounds);
  }

  /** @override */
  knockBack(): Animate {
    return knockBack(this.#model);
  }

  /** @override */
  knockBackToStand(): Animate {
    return knockBackToStand(this.#model, this.#sounds);
  }

  /** @override */
  guard(): Animate {
    return guard(this.#model);
  }

  /** @override */
  guardToStand(): Animate {
    return guardToStand(this.#model, this.#sounds);
  }

  /** @override */
  avoid(): Animate {
    return avoid(this.#model, this.#sounds);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#model, this.#sounds);
  }

  /** @override */
  down(): Animate {
    return down(this.#model);
  }

  /**
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#model, this.#sounds);
  }

  /**
   * アッパー
   * @return アニメーション
   */
  upper(): Animate {
    return upper(this.#model);
  }

  /**
   * アッパー -> 立ち
   * @return アニメーション
   */
  upperToStand(): Animate {
    return upperToStand(this.#model, this.#sounds);
  }

  /**
   * Update時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

  /**
   * PreRender時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
