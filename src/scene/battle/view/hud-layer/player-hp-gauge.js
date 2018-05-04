// @flow

import type {Resources} from "../../../../resource/index";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/hp-gauge";
import {PlayerHpGauge as create} from '../../../../game-object/gauge/hp-gauge';
import type {Player} from "gbraver-burst-core/lib/player/player";

/**
 * ゲームの状態からプレイヤーHPゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @return プレイヤーHPゲージ
 */
export function createPlayerHpGauge(resources: Resources, playerInfo: Player): HpGauge {
  return create(resources, playerInfo.armdozer.maxHp, playerInfo.armdozer.maxHp);
}