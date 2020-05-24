// @flow

import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import type {Resources} from "../../../resource";
import {HorizontalArmdozerAnimation} from "../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";

/**
 * ウィングドーザ
 */
export class WingDozer implements ArmDozerSprite {
  _mesh: HorizontalArmdozerAnimation;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this._mesh = new HorizontalArmdozerAnimation({
      id: TEXTURE_IDS.WING_DOZER_STAND,
      resources: resources,
      maxAnimation: 1,
      width: 600,
      height: 600,
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void {
    // NOP
  }

  /**
   * ターンスタート
   *
   * @return アニメーション
   */
  turnStart(): Animate {
    return empty();
  }

  /**
   * ターンスタート -> 立ち
   *
   * @return アニメーション
   */
  turnStartToStand(): Animate {
    return empty();
  }

  /**
   * ノックバック
   *
   * @return アニメーション
   */
  knockBack(): Animate {
    return empty();
  }

  /**
   * ノックバック -> 立ちポーズ
   *
   * @return アニメーション
   */
  knockBackToStand(): Animate {
    return empty();
  }

  /**
   * ガード
   *
   * @return アニメーション
   */
  guard(): Animate {
    return empty();
  }

  /** 
   * ガード -> 立ちポーズ
   *
   * @return アニメーション
   */
  guardToStand(): Animate {
    return empty();
  }

  /**
   * 避け
   *
   * @return アニメーション
   */
  avoid(): Animate {
    return empty();
  }

  /**
   * 避け -> 立ち
   *
   * @return アニメーション
   */
  avoidToStand(): Animate {
    return empty();
  }

  /**
   * ダウン
   *
   * @return アニメーション
   */
  down(): Animate {
    return empty();
  }
}
