import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { NPC } from "./npc";
import { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/** @override 攻撃ルーチン */
const attackRoutine: SimpleRoutine = (data) => {
  const battery5 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 5,
  );
  if (battery5) {
    return battery5;
  }

  return ZERO_BATTERY;
};

/** @override 防御ルーチン */
const defenseRoutine: SimpleRoutine = (data) => {
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * サイドエピソード「全国大会のリベンジ」 ウィングドーザ NPC
 * @return NPC
 */
export function wingDozerNPCForNationalTournamentRevenge(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.WING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
