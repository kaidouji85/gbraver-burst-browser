import { ArmdozerIds, PlayerId, PlayerState } from "gbraver-burst-core";

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
  /** ゲームに参加しているプレイヤー */
  players: [PlayerState, PlayerState];
  /** 現在画面を開いているプレイヤーID */
  playerId: PlayerId;
};

/**
 * ルート要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML(params: RootInnerHtmlParams) {
  const { resources, players, playerId } = params;

  const player = players.find((p) => p.playerId === playerId);
  const playerArmdozerId = player?.armdozer.id ?? ArmdozerIds.SHIN_BRAVER;
  const playerArmdozerPath =
    resources.paths.find(
      (p) => p.id === getArmdozerStandPathId(playerArmdozerId),
    )?.path ?? "";

  const enemy = players.find((p) => p.playerId !== playerId);
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
