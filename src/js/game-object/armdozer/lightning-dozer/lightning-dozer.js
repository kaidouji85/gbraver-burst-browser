// @flow

import type {Resources} from "../../../resource";
import type {ArmdozerAnimation} from "../mesh/armdozer-animation";
import type {ArmDozerSprite} from "../armdozer-sprite";
import {lightningDozerStand} from "./mesh/stand";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";

/**
 *　ライトニングドーザ
 */
export class LightningDozer implements ArmDozerSprite {
  _stand: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._stand = lightningDozerStand(resources);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._stand.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._stand.getObject3D();
  }

  /** ターンスタート */
  turnStart(): Animate {
    return empty();
  }

  /** ターンスタート -> 立ち */
  turnStartToStand(): Animate {
    return empty();
  }

  /** ノックバック */
  knockBack(): Animate {
    return empty();
  }

  /** ノックバック -> 立ちポーズ */
  knockBackToStand(): Animate {
    return empty();
  }

  /** ガード */
  guard(): Animate {
    return empty();
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return empty();
  }

  /** 避け */
  avoid(): Animate {
    return empty();
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return empty();
  }

  /** ダウン */
  down(): Animate {
    return empty();
  }
}