// @flow

import {LightningBarrierGameEffect} from "./lightning-barrier";
import type {Resources} from "../../../resource";

/**
 * プレイヤー側 電撃バリア
 *
 * @param resources リソース管理オブジェクト
 * @return 電撃バリア
 */
export function playerLightningBarrier(resources: Resources): LightningBarrierGameEffect {
  return new LightningBarrierGameEffect(resources);
}

/**
 * 敵側 電撃バリア
 *
 * @param resources リソース管理オブジェクト
 * @return 電撃バリア
 */
export function enemyLightningBarrier(resources: Resources): LightningBarrierGameEffect {
  return new LightningBarrierGameEffect(resources);
}