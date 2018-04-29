// @flow

import type {Resources} from "../../../../resource/index";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/hp-gauge";
import {EnemyHpGauge} from "../../../../game-object/gauge/hp-gauge";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/**
 * ゲームの状態から敵HPゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @return 敵HPゲージ
 */
export function createEnemyHpGauge(resources: Resources, playerId: PlayerId, players: Player[]): HpGauge {
  const enemyInfo = players.find(v => v.playerId !== playerId) || players[0];
  return EnemyHpGauge(resources, enemyInfo.armdozer.maxHp, enemyInfo.armdozer.maxHp);
}