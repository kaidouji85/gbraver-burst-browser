import { PilotIds, PlayerState } from "gbraver-burst-core";

import { FaceType } from "../../../game-dom/message-window/face-graphic";

/** パイロット叫び情報 */
type PilotSkillShout = {
  /** 顔グラフィック */
  face: FaceType;
  /** メッセージ */
  message: string;
};

/**
 * シンヤ攻撃時の叫び
 * @param player プレイヤー情報
 * @return パイロット叫び情報
 */
const shinyaAttackShout = (player: PlayerState): PilotSkillShout => ({
  face: "Shinya",
  message: `${player.armdozer.name} ここで勝負をかけるッスよ`,
});

/**
 * シンヤ防御時の叫び
 * @param player プレイヤー情報
 * @return パイロット叫び情報
 */
const shinyaDefenseShout = (player: PlayerState): PilotSkillShout => ({
  face: "Shinya",
  message: `${player.armdozer.name} ここは堪えるッス`,
});

/**
 * 状況に応じたパイロット叫び情報を取得する
 * @param player プレイヤー情報
 * @param isPilotSkillInvokerActive パイロットスキル発動者のターンか、trueで発動者のターン
 * @return 取得結果、見つからない場合はnullを返す
 */
export function getPilotSkillShout(
  player: PlayerState,
  isPilotSkillInvokerActive: boolean,
): PilotSkillShout | null {
  if (player.pilot.id === PilotIds.SHINYA && isPilotSkillInvokerActive) {
    return shinyaAttackShout(player);
  } else if (
    player.pilot.id === PilotIds.SHINYA &&
    !isPilotSkillInvokerActive
  ) {
    return shinyaDefenseShout(player);
  }
  return null;
}
