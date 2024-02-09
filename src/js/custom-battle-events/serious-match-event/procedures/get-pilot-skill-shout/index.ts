import { PilotIds, PlayerState } from "gbraver-burst-core";

import { gaiAttackShout, gaiDefenseShout } from "./gai-shout";
import { PilotSkillShout } from "./pilot-skill-shout";
import { raitoAttackShout, raitoDefenseShout } from "./raito-shout";
import { shinyaAttackShout, shinyaDefenseShout } from "./shinya-shout";
import { tsubasaAttackShout, tsubasaDefenseShout } from "./tsubasa-shout";

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
    return shinyaAttackShout();
  }

  if (player.pilot.id === PilotIds.SHINYA && !isPilotSkillInvokerActive) {
    return shinyaDefenseShout(player);
  }

  if (player.pilot.id === PilotIds.GAI && isPilotSkillInvokerActive) {
    return gaiAttackShout(player);
  }

  if (player.pilot.id === PilotIds.GAI && !isPilotSkillInvokerActive) {
    return gaiDefenseShout();
  }

  if (player.pilot.id === PilotIds.TSUBASA && isPilotSkillInvokerActive) {
    return tsubasaAttackShout(player);
  }

  if (player.pilot.id === PilotIds.TSUBASA && !isPilotSkillInvokerActive) {
    return tsubasaDefenseShout();
  }

  if (player.pilot.id === PilotIds.RAITO && isPilotSkillInvokerActive) {
    return raitoAttackShout();
  }

  if (player.pilot.id === PilotIds.RAITO && !isPilotSkillInvokerActive) {
    return raitoDefenseShout();
  }

  return null;
}
