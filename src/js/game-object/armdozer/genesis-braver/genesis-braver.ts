import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { PreRender } from "../../../game-loop/pre-render";
import { Update } from "../../../game-loop/update";
import { Resources } from "../../../resource";
import { firstUpdate } from "../../action/first-update";
import { GameObjectAction } from "../../action/game-object-action";
import { ArmdozerSprite } from "../armdozer-sprite";
import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { activeFlash } from "./animation/active-flash";
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
import { GenesisBraverModel } from "./model/genesis-braver-model";
import { createInitialValue } from "./model/initial-value";
import { GenesisBraverSounds } from "./sounds/genesis-braver-sounds";
import { createGenesisBraverSounds } from "./sounds/genesis-braver-sounds";
import { GenesisBraverView } from "./view/genesis-braver-view";

/** ジェネシスブレイバースプライト */
export class GenesisBraver
  extends EmptyArmdozerSprite
  implements ArmdozerSprite
{
  /** ビュー */
  #view: GenesisBraverView;
  /** 効果音 */
  #sounds: GenesisBraverSounds;
  /** モデル */
  #model: GenesisBraverModel;
  /** アクティブフラッシュTweenグループ */
  #activeFlashTween: TWEEN.Group;
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
    gameAction: Observable<GameObjectAction>,
  ) {
    super();
    this.#view = view;
    this.#sounds = createGenesisBraverSounds(resources);
    this.#model = createInitialValue();
    this.#activeFlashTween = new TWEEN.Group();
    this.#unsubscribers = [
      gameAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        } else if (action.type === "Update") {
          this.#onUpdate(action);
        }
      }),
      firstUpdate(gameAction).subscribe((action) => {
        this.#onFirstUpdate(action);
      }),
    ];
  }

  /** @override */
  destructor() {
    this.#view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * チャージ
   * @return アニメーション
   */
  charge(): Animate {
    return charge(this.#model, this.#sounds);
  }

  /**
   * ストレートパンチ
   * @return アニメーション
   */
  straightPunch(): Animate {
    return straightPunch(this.#model);
  }

  /**
   * ストレートパンチ -> 立ち
   * @return アニメーション
   */
  spToStand(): Animate {
    return spToStand(this.#model, this.#sounds);
  }

  /**
   * バースト
   * @return アニメーション
   */
  burst(): Animate {
    return burst(this.#model, this.#sounds);
  }

  /**
   * バースト -> 立ち
   * @return アニメーション
   */
  burstToStand(): Animate {
    return burstToStand(this.#model, this.#sounds);
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
  down(): Animate {
    return down(this.#model);
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
    return backStep(this.#model, this.#sounds);
  }

  /** @override */
  avoidToStand(): Animate {
    return frontStep(this.#model, this.#sounds);
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
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
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
   * アップデート時の処理
   * @param action アクション
   */
  #onUpdate(action: Update): void {
    this.#activeFlashTween.update(action.time);
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }

  /**
   * 最初のUpdate時だけ実行する処理
   * @param action アクション
   */
  #onFirstUpdate(action: Update): void {
    activeFlash(this.#model, this.#activeFlashTween).loop(action.time);
  }
}
