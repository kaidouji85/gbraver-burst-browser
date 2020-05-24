// @flow

import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import type {Resources} from "../../../resource";
import {HorizontalArmdozerAnimation} from "../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {WingDozerView} from "./view/wing-dozer-view";
import {PlayerWingDozerView} from "./view/player-wing-dozer-view";

/**
 * ウィングドーザ
 */
export class WingDozer implements ArmDozerSprite {
  _view: WingDozerView;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this._view = new PlayerWingDozerView(resources);
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
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
