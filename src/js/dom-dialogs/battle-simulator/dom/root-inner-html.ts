import { ArmdozerIds, correctPower, PlayerState } from "gbraver-burst-core";

import { getArmdozerStandPathId } from "../../../path/armdozer-stand-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { PathId } from "../../../resource/path/resource";
import {
  BATTLE_RESULT_NAME,
  DAMAGE,
  ROOT,
  TURN_INDICATOR,
  TURN_INDICATOR_ENEMY,
} from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * アームドーザの攻撃を取得する
 * @param player 対象プレイヤーのステート
 * @returns アームドーザの攻撃
 */
const getPower = (player: PlayerState) =>
  player.armdozer.power + correctPower(player.armdozer.effects);

/**
 * 各種パスを取得する、取得できない場合は空文字を返す
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.pathId パスID
 * @returns
 */
const getPath = (options: ResourcesContainer & { pathId: PathId }) => {
  const { resources, pathId } = options;
  return resources.paths.find((p) => p.id === pathId)?.path ?? "";
};

/**
 * プレイヤーのステートを取得する
 * @param options オプション
 * @param options.player プレイヤーのステート
 * @returns
 */
const getPlayerState = (
  options: ResourcesContainer & { player: PlayerState },
) => {
  const { player } = options;
  const playerPower = getPower(player);
  const playerArmdozerId = player.armdozer.id ?? ArmdozerIds.SHIN_BRAVER;
  const playerArmdozerPath = getPath({
    ...options,
    pathId: getArmdozerStandPathId(playerArmdozerId),
  });
  return { player, playerPower, playerArmdozerPath };
};

/**
 * 敵のステートを取得する
 * @param options オプション
 * @param options.enemy 敵のステート
 * @returns
 */
const getEnemyState = (
  options: ResourcesContainer & { enemy: PlayerState },
) => {
  const { enemy } = options;
  const enemyPower = getPower(enemy);
  const enemyArmdozerId = enemy.armdozer.id ?? ArmdozerIds.SHIN_BRAVER;
  const enemyArmdozerPath = getPath({
    ...options,
    pathId: getArmdozerStandPathId(enemyArmdozerId),
  });
  return { enemy, enemyPower, enemyArmdozerPath };
};

/** 生成オプション */
type RootInnerHtmlOptions = ResourcesContainer & {
  /** プレイヤーのステート */
  player: PlayerState;
  /** 敵のステート */
  enemy: PlayerState;
  /** プレイヤーの攻撃ターンか否か、trueでプレイヤーの攻撃ターン */
  isPlayerAttacker: boolean;
};

/**
 * ルート要素のinnerHTMLを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export function rootInnerHTML(options: RootInnerHtmlOptions) {
  const { isPlayerAttacker } = options;
  const turnIndicatorClass = isPlayerAttacker
    ? TURN_INDICATOR
    : TURN_INDICATOR_ENEMY;
  return template({
    ...getPlayerState(options),
    ...getEnemyState(options),
    ROOT,
    DAMAGE,
    BATTLE_RESULT_NAME,
    turnIndicatorClass,
    closerPath: getPath({ ...options, pathId: PathIds.CLOSER }),
    turnIndicatorPath: getPath({ ...options, pathId: PathIds.TURN_INDICATOR }),
    batteryIconPath: getPath({ ...options, pathId: PathIds.BATTERY_ICON }),
  });
}
