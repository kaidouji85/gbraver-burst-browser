import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { Resources } from "../../../resource";
import { GameObjectAction } from "../../action/game-object-action";
import { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { backStep } from "./animation/back-step";
import { bowDown } from "./animation/bow-down";
import { bowUp } from "./animation/bow-up";
import { burst } from "./animation/burst";
import { burstToStand } from "./animation/burst-to-stand";
import { charge } from "./animation/charge";
import { down } from "./animation/down";
import { endActive } from "./animation/end-active";
import { frontStep } from "./animation/front-step";
import { guard } from "./animation/guard";
import { guardToStand } from "./animation/guts-to-stand";
import { knockBack } from "./animation/knock-back";
import { knockBackToStand } from "./animation/knock-back-to-stand";
import { spToStand } from "./animation/sp-to-stand";
import { startActive } from "./animation/start-active";
import { straightPunch } from "./animation/straight-punch";
import { upright } from "./animation/upright";
import { uprightToStand } from "./animation/upright-to-stand";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { createGenesisBraverProps } from "./props/create-genesis-braver-props";
import { GenesisBraverProps } from "./props/genesis-braver-props";
import { GenesisBraverView } from "./view/genesis-braver-view";

/** ジェネシスブレイバースプライト */
export class GenesisBraver
  extends EmptyArmdozerSprite
  implements ArmdozerSprite
{
  /** プロパティ */
  #props: GenesisBraverProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameAction ゲームアクション
   */
  constructor(
    view: GenesisBraverView,
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    super();
    this.#props = createGenesisBraverProps({view, resources});
    this.#unsubscribers = bindEventListeners({ gameObjectAction, props: this.#props });
  }

  /** @override */
  destructor() {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#props.view.addObject3D(object);
  }

  /**
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#props.model, this.#props.sounds);
  }

  /**
   * ストレートパンチ
   * @return アニメーション
   */
  straightPunch(): Animate {
    return straightPunch(this.#props.model);
  }

  /**
   * ストレートパンチ -> 立ち
   * @return アニメーション
   */
  spToStand(): Animate {
    return spToStand(this.#props.model, this.#props.sounds);
  }

  /**
   * バースト
   * @return アニメーション
   */
  burst(): Animate {
    return burst(this.#props.model, this.#props.sounds);
  }

  /**
   * バースト -> 立ち
   * @return アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this.#props.model, this.#props.sounds);
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
  down(): Animate {
    return down(this.#props.model);
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
    return backStep(this.#props.model, this.#props.sounds);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#props.model, this.#props.sounds);
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

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /** @override */
  startActive(): Animate {
    return startActive(this.#props.model);
  }

  /** @override */
  endActive(): Animate {
    return endActive(this.#props.model);
  }
}
