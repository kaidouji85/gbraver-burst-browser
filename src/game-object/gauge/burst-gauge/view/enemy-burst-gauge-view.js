// @flow

import {PADDING_LEFT, PADDING_TOP, PlayerBurstGaugeView} from "./player-burst-gauge-view";
import type {Resources} from "../../../../resource";

/**
 * 敵バーストゲージビュー
 * プレイヤー版との違いは表示位置のみ
 */
export class EnemyBurstGaugeView extends PlayerBurstGaugeView {
  constructor(resources: Resources, scale: number) {
    super(resources, scale);
  }

  /** ゲージ位置を調整する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = - window.innerWidth / 2 + PADDING_LEFT * this._scale;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }
}