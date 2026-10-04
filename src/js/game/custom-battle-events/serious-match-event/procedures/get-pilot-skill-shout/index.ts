import { PilotIds, PlayerState } from "gbraver-burst-core";

import { gaiAttackShout, gaiDefenseShout } from "./gai-shout";
import { PilotSkillShout } from "./pilot-skill-shout";
import { raitoAttackShout, raitoDefenseShout } from "./raito-shout";
import { shinyaAttackShout, shinyaDefenseShout } from "./shinya-shout";
import { tsubasaAttackShout, tsubasaDefenseShout } from "./tsubasa-shout";
import { yuuyaAttackShout, yuuyaDefenseShout } from "./yuuya-shout";

/** パイロット叫びマスタ */
const pilotShouts = {
  [PilotIds.SHINYA]: {
    attack: shinyaAttackShout,
    defense: shinyaDefenseShout,
  },
  [PilotIds.GAI]: {
    attack: gaiAttackShout,
    defense: gaiDefenseShout,
  },
  [PilotIds.TSUBASA]: {
    attack: tsubasaAttackShout,
    defense: tsubasaDefenseShout,
  },
  [PilotIds.RAITO]: {
    attack: raitoAttackShout,
    defense: raitoDefenseShout,
  },
  [PilotIds.YUUYA]: {
    attack: yuuyaAttackShout,
    defense: yuuyaDefenseShout,
  },
};

/**
 * 状況に応じたパイロット叫び情報を取得する
 * @param pilotSkillInvoker スキル発動者のステート
 * @param isPilotSkillInvokerActive パイロットスキル発動者のターンか、trueで発動者のターン
 * @returns 取得結果、見つからない場合はnullを返す
 */
export function getPilotSkillShout(
  pilotSkillInvoker: PlayerState,
  isPilotSkillInvokerActive: boolean,
): PilotSkillShout | null {
  const pilotShout = pilotShouts[pilotSkillInvoker.pilot.id];
  if (!pilotShout) {
    return null;
  }

  const shoutFunc = isPilotSkillInvokerActive
    ? pilotShout.attack
    : pilotShout.defense;
  return shoutFunc(pilotSkillInvoker);
}
