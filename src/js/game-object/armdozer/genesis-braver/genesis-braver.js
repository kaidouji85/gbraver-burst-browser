// @flow

import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import type { ArmDozerSprite } from "../armdozer-sprite";
import { EmptyArmDozerSprite } from "../empty-armdozer-sprite";
import type { ArmdozerAnimation } from "../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../mesh/horizontal-animation";

/** スプライト幅 */
export const WIDTH = 600;
/** スプライト高 */
export const HEIGHT = 600;

/** ジェネシスブレイバースプライト */
export class GenesisBraver
  extends EmptyArmDozerSprite
  implements ArmDozerSprite
{
  /** 立ち */
  #sprite: ArmdozerAnimation;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param gameAction ゲームアクション
   */
  constructor(resources: Resources, gameAction: Stream<GameObjectAction>) {
    super();
    const texture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.GENESIS_BRAVER_STAND)
        ?.texture ?? new THREE.Texture();
    this.#sprite = createHorizontalAnimation({
      texture,
      maxAnimation: 1,
      width: WIDTH,
      height: HEIGHT,
    });
    this.#unsubscribers = [
      gameAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      }),
    ];
  }

  /** @override */
  destructor() {
    this.#sprite.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#sprite.getObject3D();
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#sprite.getObject3D().quaternion.copy(action.camera.quaternion);
  }
}
