import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { empty } from "../../animation/delay";
import type { ArmdozerSprite } from "./armdozer-sprite";

/**
 * 空のアームドーザスプライト
 * ArmdozerSpriteのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyArmdozerSprite implements ArmdozerSprite {
  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return new THREE.Object3D();
  }

  /** @override */

  /* eslint-disable @typescript-eslint/no-unused-vars */
  addObject3D(object: THREE.Object3D): void {
    /* eslint-enable */
    // NOP
  }

  /** @override */
  startActive(): Animate {
    return empty();
  }

  /** @override */
  endActive(): Animate {
    return empty();
  }

  /** @override */
  knockBack(): Animate {
    return empty();
  }

  /** @override */
  knockBackToStand(): Animate {
    return empty();
  }

  /** @override */
  guard(): Animate {
    return empty();
  }

  /** @override */
  guardToStand(): Animate {
    return empty();
  }

  /** @override */
  avoid(): Animate {
    return empty();
  }

  /** @override */
  avoidToStand(): Animate {
    return empty();
  }

  /** @override */
  down(): Animate {
    return empty();
  }

  /** @override */
  upright(): Animate {
    return empty();
  }

  /** @override */
  uprightToStand(): Animate {
    return empty();
  }

  /** @override */
  bowDown(): Animate {
    return empty();
  }

  /** @override */
  bowUp(): Animate {
    return empty();
  }
}
