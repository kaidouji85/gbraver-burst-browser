import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
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
  const battery4 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 4,
  );
  return battery5 ?? battery4 ?? ZERO_BATTERY;
};

/** @override 防御ルーチン */
const defenseRoutine: SimpleRoutine = (data) => {
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");
  const battery6 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 6,
  );
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3,
  );
  if (burst && data.enemy.armdozer.battery <= 0) {
    return burst;
  }

  return battery6 ?? battery3 ?? ZERO_BATTERY;
};

/**
 * ジェネシスブレイバーNPC
 * @return NPC
 */
export function genesisBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GENESIS_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
