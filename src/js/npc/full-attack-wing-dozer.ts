import {ArmDozerIds, ArmDozers, Command, PilotIds, Pilots} from "gbraver-burst-core";

import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = ({
  commands,
  enemy
}) => {
  const allBattery = commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === enemy.armdozer.battery);
  return allBattery ?? ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = ({
  commands
}) => {
  const burst = commands.find(v => v.type === "BURST_COMMAND");
  const battery1 = commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 1);
  return burst ?? battery1 ?? ZERO_BATTERY;
};

/**
 * 先行攻撃全振り ライトニングドーザ NPC
 *
 * @returns NPC
 */
export function fullAttackWingDozer(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.WING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}