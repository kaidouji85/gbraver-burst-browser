import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import {
  ENEMY_GENESIS_BRAVER,
  ENEMY_GRAN_DOZER,
  ENEMY_LIGHTNING_DOZER,
  ENEMY_NEO_LANDOZER,
  ENEMY_SHIN_BRAVER,
  ENEMY_WING_DOZER,
  PLAYER_GENESIS_BRAVER,
  PLAYER_GRAN_DOZER,
  PLAYER_LIGHTNING_DOZER,
  PLAYER_NEO_LANDOZER,
  PLAYER_SHIN_BRAVER,
  PLAYER_WING_DOZER,
} from "./class-name";

/** プレイヤーのアームドーザのクラス名 */
const playerArmdozerClassNames = {
  [ArmdozerIds.SHIN_BRAVER]: PLAYER_SHIN_BRAVER,
  [ArmdozerIds.NEO_LANDOZER]: PLAYER_NEO_LANDOZER,
  [ArmdozerIds.LIGHTNING_DOZER]: PLAYER_LIGHTNING_DOZER,
  [ArmdozerIds.WING_DOZER]: PLAYER_WING_DOZER,
  [ArmdozerIds.GENESIS_BRAVER]: PLAYER_GENESIS_BRAVER,
  [ArmdozerIds.GRAN_DOZER]: PLAYER_GRAN_DOZER,
};

/**
 * プレイヤーのアームドーザのクラス名を取得する
 * @param armdozerId アームドーザID
 * @returns クラス名
 */
export const getPlayerArmdozerClassName = (armdozerId: string) =>
  playerArmdozerClassNames[armdozerId] ?? PLAYER_SHIN_BRAVER;

/** 敵のアームドーザのクラス名 */
const enemyArmdozerClassNames = {
  [ArmdozerIds.SHIN_BRAVER]: ENEMY_SHIN_BRAVER,
  [ArmdozerIds.NEO_LANDOZER]: ENEMY_NEO_LANDOZER,
  [ArmdozerIds.LIGHTNING_DOZER]: ENEMY_LIGHTNING_DOZER,
  [ArmdozerIds.WING_DOZER]: ENEMY_WING_DOZER,
  [ArmdozerIds.GENESIS_BRAVER]: ENEMY_GENESIS_BRAVER,
  [ArmdozerIds.GRAN_DOZER]: ENEMY_GRAN_DOZER,
};

/**
 * 敵のアームドーザのクラス名を取得する
 * @param armdozerId アームドーザID
 * @returns クラス名
 */
export const getEnemyArmdozerClassName = (armdozerId: ArmdozerId) =>
  enemyArmdozerClassNames[armdozerId] ?? ENEMY_SHIN_BRAVER;
