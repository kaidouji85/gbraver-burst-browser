// @flow

import type {Resources} from "../../resource";
import {drawWindow} from "./window";
import {drawHpGauge} from "./hp-gauge";

export type Param = {
  /** 描画対象 */
  context: CanvasRenderingContext2D,
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 描画位置X */
  dx: number,
  /** 描画位置Y */
  dy: number,
  /** HP */
  hp: number,
  /** 最大HP */
  maxHp: number
};

/**
 * ゲージを描画する
 *
 * @param param パラメータ
 */
export function drawGauge(param: Param): void {
  drawWindow(param);
  drawHpGauge(param);
}

