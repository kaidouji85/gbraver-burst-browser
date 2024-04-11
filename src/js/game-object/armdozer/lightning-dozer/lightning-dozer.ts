import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { armHammer } from "./animation/arm-hammer";
import { avoid } from "./animation/avoid";
import { bowDown } from "./animation/bow-down";
import { bowUp } from "./animation/bow-up";
import { charge } from "./animation/charge";
import { down } from "./animation/down";
import { endActive } from "./animation/end-active";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guard-to-stand";
import { guts } from "./animation/guts";
import { gutsToStand } from "./animation/guts-to-stand";
import { hmToStand } from "./animation/hm-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { startActive } from "./animation/start-active";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { createLightningDozerProps } from "./props/create-lightning-dozer-props";
import { LightningDozerProps } from "./props/lightning-dozer-props";
import type { LightningDozerView } from "./view/lightning-dozer-view";

/** ライトニングドーザ */
export class LightningDozer
  extends EmptyArmdozerSprite
  implements ArmdozerSprite
{
  /** プロパティ */
  #props: LightningDozerProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param view ビュー
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
    view: LightningDozerView,
  ) {
    super();
    this.#props = createLightningDozerProps({ view, resources });
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
  destructor() {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#props.view.addObject3D(object);
  }

  /** @override */
  startActive(): Animate {
    return startActive(this.#props.model);
  }

  /** @override */
  endActive(): Animate {
    return endActive(this.#props.model);
  }

  /**
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#props.model, this.#props.sounds);
  }

  /**
   * アームハンマー
   * @return アニメーション
   */
  armHammer(): Animate {
    return armHammer(this.#props.model);
  }

  /**
   * アームハンマー -> 立ち
   * @return アニメーション
   */
  hmToStand(): Animate {
    return hmToStand(this.#props.model, this.#props.sounds);
  }

  /**
   * ガッツ
   * @return アニメーション
   */
  guts(): Animate {
    return guts(this.#props.model, this.#props.sounds);
  }

  /**
   * ガッツ -> 立ち
   * @return アニメーション
   */
  gutsToStand(): Animate {
    return gutsToStand(this.#props.model, this.#props.sounds);
  }

  /** @override */
  knockBack(): Animate {
    return knockBack(this.#props.model);
  }

  /** @override */
  knockBackToStand(): Animate {
    return knockBackToStand(this.#props.model, this.#props.sounds);
  }

  /** @override */
  guard(): Animate {
    return guard(this.#props.model);
  }

  /** @override */
  guardToStand(): Animate {
    return guardToStand(this.#props.model, this.#props.sounds);
  }

  /** @override */
  avoid(): Animate {
    return avoid(this.#props.model, this.#props.sounds);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#props.model, this.#props.sounds);
  }

  /** @override */
  down(): Animate {
    return down(this.#props.model);
  }

  /** @override */
  upright(): Animate {
    return upright(this.#props.model, this.#props.sounds);
  }

  /** @override */
  uprightToStand(): Animate {
    return uprightToStand(this.#props.model, this.#props.sounds);
  }

  /** @override */
  bowDown(): Animate {
    return bowDown(this.#props.model, this.#props.sounds);
  }

  /** @override */
  bowUp(): Animate {
    return bowUp(this.#props.model, this.#props.sounds);
  }

  /**
   * Update時の処理
   */
  #onUpdate(): void {
    this.#props.view.engage(this.#props.model);
  }

  /**
   * PreRender時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#props.view.lookAt(action.camera);
  }
}
