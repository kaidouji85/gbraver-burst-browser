import { ArmdozerIds, PlayerState } from "gbraver-burst-core";

import { getArmdozerStandPathId } from "../../../path/armdozer-stand-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import {
  ENEMY_BATTERY_CORRECT_HIDDEN,
  PLAYER_BATTERY_CORRECT_HIDDEN,
  ROOT,
} from "./class-name";
import template from "./root-inner-html.hbs";

/** 生成パラメータ */
type RootInnerHtmlParams = ResourcesContainer & {
  /** プレイヤーのステート */
  player: PlayerState;
  /** 敵のステート */
  enemy: PlayerState;
};

/**
 * ルート要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML(params: RootInnerHtmlParams) {
  const { resources, player, enemy } = params;

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

  const turnIndicatorPath =
    resources.paths.find((p) => p.id === PathIds.TURN_INDICATOR)?.path ?? "";

  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT,
    PLAYER_BATTERY_CORRECT_HIDDEN,
    ENEMY_BATTERY_CORRECT_HIDDEN,
    closerPath,
    playerArmdozerPath,
    enemyArmdozerPath,
    turnIndicatorPath,
  });
}
