import { ArmdozerIds, correctPower, PlayerState } from "gbraver-burst-core";

import { getArmdozerStandPathId } from "../../../path/armdozer-stand-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT, TURN_INDICATOR, TURN_INDICATOR_ENEMY } from "./class-name";
import template from "./root-inner-html.hbs";

/** 生成パラメータ */
type RootInnerHtmlParams = ResourcesContainer & {
  /** プレイヤーのステート */
  player: PlayerState;
  /** 敵のステート */
  enemy: PlayerState;
  /** プレイヤーの攻撃ターンか否か、trueでプレイヤーの攻撃ターン */
  isPlayerAttacker: boolean;
};

/**
 * ルート要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML(params: RootInnerHtmlParams) {
  const { resources, player, enemy, isPlayerAttacker } = params;

  const playerPower =
    player.armdozer.power + correctPower(player.armdozer.effects);
  const enemyPower =
    enemy.armdozer.power + correctPower(enemy.armdozer.effects);

  const playerArmdozerId = player?.armdozer.id ?? ArmdozerIds.SHIN_BRAVER;
  const playerArmdozerPath =
    resources.paths.find(
      (p) => p.id === getArmdozerStandPathId(playerArmdozerId),
    )?.path ?? "";

  const enemyArmdozerId = enemy?.armdozer.id ?? ArmdozerIds.SHIN_BRAVER;
  const enemyArmdozerPath =
    resources.paths.find(
      (p) => p.id === getArmdozerStandPathId(enemyArmdozerId),
    )?.path ?? "";

  const turnIndicatorClass = isPlayerAttacker
    ? TURN_INDICATOR
    : TURN_INDICATOR_ENEMY;

  const turnIndicatorPath =
    resources.paths.find((p) => p.id === PathIds.TURN_INDICATOR)?.path ?? "";

  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";

  const batteryIconPath =
    resources.paths.find((p) => p.id === PathIds.BATTERY_ICON)?.path ?? "";
  return template({
    player,
    playerPower,
    enemy,
    enemyPower,
    ROOT,
    turnIndicatorClass,
    closerPath,
    playerArmdozerPath,
    enemyArmdozerPath,
    turnIndicatorPath,
    batteryIconPath,
  });
}
