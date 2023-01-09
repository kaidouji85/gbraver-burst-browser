import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmDozerSprite } from "../armdozer-sprite";
import { EmptyArmDozerSprite } from "../empty-armdozer-sprite";
import { charge } from "./animation/charge";
import { spToStand } from "./animation/sp-to-stand";
import { straightPunch } from "./animation/straight-punch";
import type { GenesisBraverModel } from "./model/genesis-braver-model";
import { createInitialValue } from "./model/initial-value";
import type { GenesisBraverSounds } from "./sounds/genesis-braver-sounds";
import { createGenesisBraverSounds } from "./sounds/genesis-braver-sounds";
import type { GenesisBraverView } from "./view/genesis-braver-view";

/** ジェネシスブレイバースプライト */
export class GenesisBraver
  extends EmptyArmDozerSprite
  implements ArmDozerSprite
{
  /** ビュー */
  #view: GenesisBraverView;

  /** 効果音 */
  #sounds: GenesisBraverSounds;

  /** モデル */
  #model: GenesisBraverModel;

  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameAction ゲームアクション
   */
  constructor(
    view: GenesisBraverView,
    resources: Resources,
    gameAction: Stream<GameObjectAction>
  ) {
    super();
    this.#view = view;
    this.#sounds = createGenesisBraverSounds(resources);
    this.#model = createInitialValue();
    this.#unsubscribers = [
      gameAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        } else if (action.type === "Update") {
          this.#onUpdate();
        }
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

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}
