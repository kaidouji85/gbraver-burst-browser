// @flow

import {LightningDozer} from "./lightning-dozer";
import type {Resources} from "../../../resource";

/**
 * プレイヤー側のライトニングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return プレイヤー側のライトニングドーザ
 */
export function playerLightningDozer(resources: Resources): LightningDozer {
  return new LightningDozer(resources);
}

/**
 * 敵側のライトニングドーザを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 敵側のライトニングドーザ
 */
export function enemyLightningDozer(resources: Resources): LightningDozer {
  return new LightningDozer(resources);
}