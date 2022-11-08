// @flow

import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { empty } from "../../animation/delay";
import type { ArmDozerSprite } from "./armdozer-sprite";

/**
 * 空のアームドーザスプライト
 * ArmDozerSpriteのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyArmDozerSprite implements ArmDozerSprite {
  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return new THREE.Object3D();
  }

  /** @override */
  /* eslint-disable no-unused-vars */
  addObject3D(object: typeof THREE.Object3D): void {
    /* eslint-enable no-unused-vars */
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
}
