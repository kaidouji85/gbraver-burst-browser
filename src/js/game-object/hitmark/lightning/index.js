// @flow

import {Lightning} from "./lightning";
import type {Resources} from "../../../resource";

/**
 * プレイヤー側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function playerLightning(resources: Resources): Lightning {
  return new Lightning(resources);
}

/**
 * 敵側 電撃ヒットマーク
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function enemyLightning(resources: Resources): Lightning {
  const ret = new Lightning(resources);
  const target = ret.getObject3D();
  target.scale.x *= -1;
  target.position.x *= -1;
  return ret;
}