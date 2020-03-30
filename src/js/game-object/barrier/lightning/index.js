// @flow

import {LightningBarrierGameEffect} from "./lightning-barrier";
import type {Resources} from "../../../resource";

/**
 * プレイヤー側 電撃バリア
 *
 * @param resources リソース管理オブジェクト
 * @return 電撃バリア
 */
export function playerLightningField(resources: Resources): LightningBarrierGameEffect {
  return new LightningBarrierGameEffect(resources);
}

/**
 * 敵側 電撃バリア
 *
 * @param resources リソース管理オブジェクト
 * @return 電撃バリア
 */
export function enemyLightningField(resources: Resources): LightningBarrierGameEffect {
  return new LightningBarrierGameEffect(resources);
}